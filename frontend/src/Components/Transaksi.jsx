import React, { useState, useEffect } from "react";
import api from "../service/api";
import { Link } from "react-router-dom";

const Transaksi = (props) => {
    const [userData, setUser] = useState([]);
    const [bukuData, setBuku] = useState([]);

    useEffect(() => {
        getUserBuku();
    }, []);

    const getUserBuku = async () => {
        const user = await api.get(`/user/${props.userId}`);
        setUser(user.data);
        const buku = await api.get(`/buku/${props.bukuId}`);
        setBuku(buku.data);
    }
    return (
        <>
        {console.log(userData)}
            <tr key={props.id}>
                <td>{props.id}</td>
                <td>{userData.username}</td>
                <td>{bukuData.judul}</td>
                <td>{props.jumlah}</td>
                <td>{props.total}</td>
                <td>{props.status}</td>
                <td>
                <Link to={`/transaksi/${props.id}`} className='btn btn-info btn-sm'>Edit</Link>
                <button onClick={() => props.hapus(props.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        </>
    )
}

export default Transaksi;