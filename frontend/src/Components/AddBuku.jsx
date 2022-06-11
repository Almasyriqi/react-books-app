import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import UserService from "../service/user-service";

const AddBuku = () => {
    const [judul, setJudul] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [penulis, setPenulis] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');
    const [gambar, setGambar] = useState('');
    const navigate = useNavigate();

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
    }, []);

    const saveBuku = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (let i = 0; i < gambar.length; i++) {
            data.append('file', gambar[i]);
        }

        await api.post('/buku/', {
            judul: judul,
            penerbit: penerbit,
            penulis: penulis,
            keterangan: keterangan,
            stok: stok,
            harga: harga,
            gambar: `./images/${gambar[0]['name']}`
        });

        await axios.post('//localhost:8000/upload', data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

        navigate("/");
    }

    if (content === "Admin Content.") {
        return (
            <div className="container-sm">
                <h2 className="head">Tambah Buku</h2><hr />
                <form onSubmit={saveBuku}>
                    <div className="mb-3">
                        <label htmlFor="judul" className="form-label">Judul</label>
                        <input type="text" className="form-control" id="judul" required
                            placeholder="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="penerbit" className="form-label">Penerbit</label>
                        <input type="text" className="form-control" id="penerbit" required
                            placeholder="Penerbit" value={penerbit} onChange={(e) => setPenerbit(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="penulis" className="form-label">Penulis</label>
                        <input type="text" className="form-control" id="penulis" required
                            placeholder="Penulis" value={penulis} onChange={(e) => setPenulis(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="keterangan" className="form-label">Keterangan</label>
                        <textarea className="form-control" id="keterangan" required
                            value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stok" className="form-label">Stok</label>
                        <input type="number" className="form-control" id="stok" required
                            placeholder="Stok" value={stok} onChange={(e) => setStok(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="harga" className="form-label">Harga</label>
                        <input type="number" className="form-control" id="harga" required
                            placeholder="Harga" value={harga} onChange={(e) => setHarga(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gambar" className="form-label">Gambar</label>
                        <input type="file" className="form-control" id="gambar"
                            onChange={(e) => setGambar(e.target.files)} multiple />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary btn-lg">Save</button>
                        <Link to={'/'} className='btn btn-danger btn-lg'>Cancel</Link>
                    </div>
                </form>
            </div>
        )
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
export default AddBuku;