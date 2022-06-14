import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import ButtonEdit from "./button/ButtonEdit";
import ButtonDelete from "./button/ButtonDelete";
import ButtonOrder from "./button/ButtonOrder";

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
                                        <ButtonOrder id={item.id} stok={item.stok}/>
                                        <ButtonEdit id={item.id}/>
                                        <ButtonDelete hapus={hapus} id={item.id}/>
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