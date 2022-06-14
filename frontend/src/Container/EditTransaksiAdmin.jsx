import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import UserService from "../service/user-service";

const EditTransaksiAdmin = () => {
    const [user, setUser] = useState([]);
    const [buku, setBuku] = useState([]);
    const [username, setUsername] = useState('');
    const [bukuId, setBukuId] = useState('');
    const [judul, setJudul] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [status, setStatus] = useState('');
    const { id } = useParams();
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
        getTransaksiById();
        getUserBuku();
    }, []);

    const getTransaksiById = async () => {
        const response = await api.get(`/transaksi/${id}`);
        const user = await api.get(`/user/${response.data[0].user_id}`);
        const buku = await api.get(`/buku/${response.data[0].buku_id}`);
        console.log(response.data);
        setUsername(user.data.username);
        setJudul(buku.data.judul);
        setBukuId(buku.data.id);
        setJumlah(response.data[0].jumlah);
        setStatus(response.data[0].status);
    }

    const getUserBuku = async () => {
        const user = await api.get(`/user/`);
        setUser(user.data);
        const buku = await api.get(`/buku/`);
        setBuku(buku.data);
    }

    const updateTransaksi = async (e) => {
        e.preventDefault();

        let hasil = 0, jumlahBuku = 0;
        const buku = await api.get(`/buku/${bukuId}`);
        let stokBuku = buku.data.stok;
        let inputJumlah = jumlah;
        hasil = inputJumlah * buku.data.harga;
        console.log(hasil);

        const response = await api.get(`/transaksi/${id}`);

        if(response.data.jumlah > jumlah){
            jumlahBuku = response.data[0].jumlah - inputJumlah;
            stokBuku += jumlahBuku;
        } else {
            jumlahBuku = inputJumlah - response.data[0].jumlah;
            stokBuku -= jumlahBuku;
        }
        
        console.log(jumlahBuku);
        console.log(stokBuku);

        if(response.data.jumlah !== jumlah) {
            try {
                await api.patch(`/transaksi/${id}`, {
                    username: username,
                    idBuku: bukuId,
                    jumlah: jumlah,
                    total: hasil,
                    status: status
                });
            } catch (error) {
                console.log(error.message);
            }

            try {
                await api.patch(`/buku/${bukuId}`, {
                    stok: stokBuku
                });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            try {
                await api.patch(`/transaksi/${id}`, {
                    username: username,
                    idBuku: bukuId,
                    status: status
                });
            } catch (error) {
                console.log(error.message);
            }
        }
        navigate("/transaksi");
    }

    if (content === "Admin Content.") {
        return (
            <div className="container-sm">
                <h2 className="head">Edit Transaksi</h2><hr />
                <form onSubmit={updateTransaksi}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User</label>
                        <select className="form-select" aria-label="Default select example" id="user"
                            required onChange={(e) => setUsername(e.target.value)}>
                            <option selected value={username}>{username}</option>
                            {user.map(({ id, username }, index) => <option key={id} value={username} >{username}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="buku" className="form-label">Buku</label>
                        <select className="form-select" aria-label="Default select example" id="buku"
                            required onChange={(e) => setBukuId(e.target.value)}>
                            <option selected value={bukuId}>{judul}</option>
                            {buku.map(({ id, judul }, index) => <option key={id} value={id} >{judul}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jumlah" className="form-label">Jumlah</label>
                        <input type="number" className="form-control" id="jumlah" required
                            value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" aria-label="Default select example" id="status"
                            required onChange={(e) => setStatus(e.target.value)}>
                            <option selected value={status}>{status}</option>
                            <option value="proses">Proses</option>
                            <option value="dikirim">Dikirim</option>
                            <option value="terkirim">Terkirim</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary btn-lg">Update</button>
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
export default EditTransaksiAdmin;