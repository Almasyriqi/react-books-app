import React, { useState, useEffect } from "react";
import api from "../service/api";
import History from "../Components/History";
import './TransaksiStyle.css';
import UserService from "../service/user-service";
import AuthService from "../service/auth-service";

const HistoryUser = () => {
    const [transaksiData, setData] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
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
        const currentUser = AuthService.getCurrentUser();
        const response = await api.get(`/transaksi/user/${currentUser.username}`);
        setData(response.data.bukus);
    }

    if(content === "User Content.") {
        return (
            <>
                {console.log(transaksiData)}
                <div className="header">
                    <div className="row1">
                        <h1>A room without books is like<br /> a body without a soul.</h1>
                    </div>
                    <div className="row2">
                        <h2>History Order</h2>
                        <img src="./images/bg2.jpg" alt="" /> <br />
                    </div>
                </div>
                <div className="container">
                    {transaksiData.length === 0 ? (
                        <h3>Data Tidak Ditemukan</h3>
                    ) : (
                        <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Judul</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transaksiData.map(data => {
                                    return <History key={data.id} id={data.id}
                                    judul={data.judul} jumlah={data.transaksi.jumlah} total={data.transaksi.total} 
                                    status={data.transaksi.status} />
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

export default HistoryUser;