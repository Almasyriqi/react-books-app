import React from "react";

const Modal=({show, item, onClose})=>{
    if(!show){
        return null;
    }
    let thumbnail = item.gambar;
    return(
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><i class="fa-solid fa-circle-xmark"></i></button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.judul}</h1>
                            <h3>{item.penulis}</h3>
                            <h4>{item.publisher}</h4><br />
                        </div>
                    </div>
                    <h4 className="description">{item.keterangan}</h4>
                </div>
            </div>
        </>
    )
}
export default Modal;