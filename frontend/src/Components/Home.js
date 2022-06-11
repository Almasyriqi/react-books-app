import React, {useState, useEffect} from "react";
import Card from "./Card";
import api from "../service/api";
import ButtonAdd from "./button/ButtonAdd";

const Home=()=>{
    const [search, setSearch]=useState("");
    const [bookData,setData]=useState([]);

    useEffect(() => {
        getBuku();
    }, []);

    const getBuku = async () => {
        const response = await  api.get(`/buku/`);
        setData(response.data);
    }
    const searchBook=(evt)=>{
        if(evt.key==="Enter"){
            api.get(`/buku/search?query=${search}`)
            .then(res=>setData(res.data))
            .catch(err=>console.log(err))
        }
    }

    const deleteBuku = async (id) => {
        var yakin = window.confirm("Apakah kamu yakin menghapus buku ini?");

        if (yakin) {
            await api.delete(`/buku/${id}`);
            getBuku();
        } else {
            window.alert("Baiklah :)");
        }
    }

    return(
        <>
        {console.log(bookData)}
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like<br /> a body without a soul.</h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Name"
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <img src="./images/bg2.jpg" alt="" /> <br/>
                    <ButtonAdd />
                </div>
            </div>
            <div className="container-buku">
                {
                    <Card book={bookData} hapus={deleteBuku}/>
                }
            </div>
        </>
    )
}

export default Home;