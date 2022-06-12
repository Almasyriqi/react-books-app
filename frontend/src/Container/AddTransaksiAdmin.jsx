import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import UserService from "../service/user-service";

const AddTransaksiAdmin = () => {
    const [user, setUser] = useState([]);
    const [buku, setBuku] = useState([]);
    const [username, setUsername] = useState('');
    const [bukuId, setBukuId] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [status, setStatus] = useState('');
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
        getUserBuku();
    }, []);

    const getUserBuku = async () => {
        const user = await api.get(`/user/`);
        setUser(user.data);
        const buku = await api.get(`/buku/`);
        setBuku(buku.data);
    }

    const saveTransaksi = async (e) => {
        e.preventDefault();
        let hasil = 0;
        const buku = await api.get(`/buku/${bukuId}`);
        hasil = jumlah * buku.data.harga;

        console.log(hasil);
        console.log(username);
        try {
            await api.post('/transaksi/', {
                username: username,
                idBuku: bukuId,
                jumlah: jumlah,
                total: hasil,
                status: status
            });
        } catch (error) {
            console.log(error.message);
        }

        navigate("/transaksi");
    }

    if (content === "Admin Content.") {
        return (
            <div className="container-sm">
                <h2 className="head">Tambah Transaksi</h2><hr />
                <form onSubmit={saveTransaksi}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User</label>
                        <select className="form-select" aria-label="Default select example" id="user"
                            required onChange={(e) => setUsername(e.target.value)}>
                            <option selected disabled value="">--Pilih User--</option>
                            {user.map(({ id, username }, index) => <option key={id} value={username} >{username}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="buku" className="form-label">Buku</label>
                        <select className="form-select" aria-label="Default select example" id="buku"
                            required onChange={(e) => setBukuId(e.target.value)}>
                            <option selected disabled value="">--Pilih Buku--</option>
                            {buku.map(({ id, judul }, index) => <option key={id} value={id} >{judul}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jumlah" className="form-label">Jumlah</label>
                        <input type="number" className="form-control" id="jumlah" required
                            placeholder="Jumlah" value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" aria-label="Default select example" id="status"
                            required onChange={(e) => setStatus(e.target.value)}>
                            <option selected disabled value="">--Pilih Status--</option>
                            <option value="proses">Proses</option>
                            <option value="dikirim">Dikirim</option>
                            <option value="terkirim">Terkirim</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary btn-lg">Save</button>
                        <Link to={'/transaksi/'} className='btn btn-danger btn-lg'>Cancel</Link>
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
export default AddTransaksiAdmin;