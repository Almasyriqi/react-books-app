import React, { useState, useEffect } from "react";
import api from "../service/api";
import { Link } from "react-router-dom";
import Transaksi from "../Components/Transaksi";
import './TransaksiStyle.css';
import UserService from "../service/user-service";

const TransaksiAdmin = () => {
    const [transaksiData, setData] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
        getTransaksi();
    }, []);

    const getTransaksi = async () => {
        const response = await api.get(`/transaksi/`);
        setData(response.data);
    }

    const deleteTransaksi = async (id) => {
        var yakin = window.confirm("Apakah kamu yakin menghapus transaksi ini?");

        if (yakin) {
            await api.delete(`/transaksi/${id}`);
            getTransaksi();
        } else {
            window.alert("Oke");
        }
    }

    if(content === "Admin Content.") {
        return (
            <>
                {/* {console.log(transaksiData)} */}
                <div className="header">
                    <div className="row1">
                        <h1>A room without books is like<br /> a body without a soul.</h1>
                    </div>
                    <div className="row2">
                        <h2>Transaksi</h2>
                        <img src="./images/bg2.jpg" alt="" /> <br />
                        <Link to="/transaksi/add" className='btn btn-primary btn-lg'>Add New</Link>
                    </div>
                </div>
                <div className="container">
                    {transaksiData.length === 0 ? (
                        <h3>Data Tidak Ditemukan</h3>
                    ) : (
                        <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Judul</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transaksiData.map(transaksi => {
                                    return <Transaksi key={transaksi.id} id={transaksi.id} username={transaksi.username}
                                    judul={transaksi.judul} jumlah={transaksi.jumlah} total={transaksi.total} status={transaksi.status} 
                                    hapus={deleteTransaksi} userId={transaksi.user_id} bukuId={transaksi.buku_id}/>
                                })
                            }
                        </tbody>
                    </table>
                    )}
                </div>
            </>
        );
    }
    else {
        return (
            <div className="container">
                <header className="mt-4 p-5 bg-dark text-white rounded">
                    <h3>{content}</h3>
                </header>
            </div>
        );
    }
}

export default TransaksiAdmin;