import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const EditBuku = () => {
    const [judul, setJudul] = useState('');
    const [penerbit, setPenerbit] = useState('');
    const [penulis, setPenulis] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [stok, setStok] = useState('');
    const [gambar, setGambar] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateBuku = async (e) => {
        e.preventDefault();
        console.log(gambar);
        if (gambar !== '') {
            await api.patch(`/${id}`, {
                judul: judul,
                penerbit: penerbit,
                penulis: penulis,
                keterangan: keterangan,
                stok: stok,
                gambar: `./images/${gambar[0]['name']}`
            });

            const data = new FormData();

            for (let i = 0; i < gambar.length; i++) {
                data.append('file', gambar[i]);
            }

            await axios.post('//localhost:8000/upload', data)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            await api.patch(`/${id}`, {
                judul: judul,
                penerbit: penerbit,
                penulis: penulis,
                keterangan: keterangan,
                stok: stok
            });
        }
        navigate("/");
    }

    useEffect(() => {
        getBukuById();
    }, []);

    const getBukuById = async () => {
        const response = await api.get(`/${id}`);
        setJudul(response.data.judul);
        setPenerbit(response.data.penerbit);
        setPenulis(response.data.penulis);
        setKeterangan(response.data.keterangan);
        setStok(response.data.stok);
    }

    return (
        <div className="container-sm">
            <h2 className="head">Update Buku</h2><hr />
            <form onSubmit={updateBuku}>
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
                    <textarea className="form-control area" id="keterangan" required
                        value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="stok" className="form-label">Stok</label>
                    <input type="number" className="form-control" id="stok" required
                        placeholder="Stok" value={stok} onChange={(e) => setStok(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="gambar" className="form-label">Gambar</label>
                    <input type="file" className="form-control" id="gambar"
                        onChange={(e) => setGambar(e.target.files)} multiple />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary btn-lg">Update</button>
                    <Link to={'/'} className='btn btn-danger btn-lg'>Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default EditBuku;