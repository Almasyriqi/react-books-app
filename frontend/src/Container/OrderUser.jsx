import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import UserService from "../service/user-service";
import AuthService from "../service/auth-service";

const OrderUser = () => {
    const [judul, setJudul] = useState('');
    const [username, setUsername] = useState('');
    const [harga, setHarga] = useState('');
    const [stok, setStok] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [gambar, setGambar] = useState('');
    const { idBuku } = useParams();
    const navigate = useNavigate();

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
        getUserBuku();
    }, []);

    const getUserBuku = async () => {
        const user = AuthService.getCurrentUser();
        console.log(user);
        setUsername(user.username);
        const buku = await api.get(`/buku/${idBuku}`);
        setJudul(buku.data.judul);
        setHarga(buku.data.harga);
        let thumbnail = "." + buku.data.gambar;
        setGambar(thumbnail);
        setStok(buku.data.stok);
    }

    const saveOrder = async (e) => {
        e.preventDefault();

        if(jumlah <= stok && jumlah > 0){
            let hasil = 0;
        hasil = jumlah * harga;
        let stokBuku = stok - jumlah

        const transaksi = await api.get(`/transaksi/user/${username}`);

        console.log(hasil);
        console.log(transaksi.data.bukus);

        var found = false;
        var indeks = 0;
        var jumlahBuku = 0;
        for (var i = 0; i < transaksi.data.bukus.length; i++) {
            if (transaksi.data.bukus[i].judul === judul) {
                found = true;
                indeks = i;
                break;
            }
        }

        if(found === true){
            hasil += transaksi.data.bukus[indeks].transaksi.total;
            jumlahBuku = parseInt(transaksi.data.bukus[indeks].transaksi.jumlah) + parseInt(jumlah);

            try {
                await api.patch(`/transaksi/${transaksi.data.bukus[indeks].transaksi.id}`, {
                    jumlah: jumlahBuku,
                    total: hasil
                });
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            jumlahBuku = jumlah;
            try {
                await api.post('/transaksi/', {
                    username: username,
                    idBuku: idBuku,
                    jumlah: jumlahBuku,
                    total: hasil,
                    status: "proses"
                });
            } catch (error) {
                console.log(error.message);
            }
        }

        try {
            await api.patch(`/buku/${idBuku}`, {
                stok: stokBuku
            });
        } catch (error) {
            console.log(error.message);
        }

        navigate("/");
        }
        else {
            window.alert("Jumlah Tidak Sesuai");
        }
    }

    if (content === "User Content.") {
        return (
            <div className="container-sm">
                <h2 className="head">Order Buku</h2><hr />
                <form onSubmit={saveOrder}>
                    <div className="mb-3">
                        <img src={gambar} alt="" width={100} height={200} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="judul" className="form-label">Judul</label>
                        <input type="text" className="form-control" id="judul" disabled
                            value={judul} onChange={(e) => { }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="harga" className="form-label">Harga</label>
                        <input type="number" className="form-control" id="harga" disabled
                            value={harga} onChange={(e) => { }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jumlah" className="form-label">Jumlah</label>
                        <input type="number" className="form-control" id="jumlah" required
                            placeholder="Jumlah" value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="total" className="form-label">Total</label>
                        <input type="number" className="form-control" id="total" disabled
                            placeholder="Total" value={jumlah * harga} onChange={(e) => { }} />
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
export default OrderUser;