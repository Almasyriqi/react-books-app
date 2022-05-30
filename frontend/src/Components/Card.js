import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Card = ({ book, hapus }) => {
    const [show, setShow]=useState(false);
    const [bookItem, setItem]=useState();

    console.log(book);
    return (
        <>
            {
                book.map((item) => {
                    let thumbnail = item.gambar;
                    let amount=item.stok;
                    if (thumbnail !== undefined && amount !== undefined) {
                        return (
                            <>
                                <div className="card" onClick={()=>{setShow(true);setItem(item)}}>
                                    <img src={thumbnail} alt=""/>
                                    <div className="card-body">
                                        <h3 className="title">{item.judul}</h3>
                                        <p className="amount">Jumlah : {amount}</p>
                                        <Link to={`/edit/${item.id}`} className='btn btn-info btn-sm'>Edit</Link>
                                        <button onClick={() => hapus(item.id)} className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </div>
                                <Modal show={show} item={bookItem} key={item.id} onClose={()=>setShow(false)}/>
                            </>
                        )
                    }
                })
            }
        </>
    )
}

export default Card;