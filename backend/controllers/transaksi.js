import Transaksi from "../models/transaksiModel.js";
import Buku from "../models/bukuModels.js";
import User from "../models/userModel.js";

export const getAllTransaksi = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll();
        res.json(transaksi);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getTransaksiById = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(transaksi);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getTransaksiByUsername = async (req, res) => {
    try {
        const transaksi = await User.findOne({
            where: {
                username: req.params.username
            }, include: Buku
        });
        res.json(transaksi);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createTransaksi = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username }
        });

        if (user === null) {
            console.log("User Not Found");
        } else {
            console.log(user instanceof User);
        }

        const buku = await Buku.findByPk(req.body.idBuku);
        if (buku === null) {
            console.log("Buku not found");
        } else {
            console.log(buku instanceof Buku);
        }

        await user.addBuku(buku, {
            through: {
                jumlah: req.body.jumlah, total: req.body.total, status: req.body.status
            }
        });

        const result = await User.findOne({
            where: {username: user.username},
            include: Buku
        });

        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateTransaksi = async (req, res) => {
    try {
        await Transaksi.update(req.body, { 
            where: {
                id: req.params.id
            }
        });
        res.json({"message": "transaksi Updated"});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteTransaksi = async (req, res) => {
    try {
        await Transaksi.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({"message": "Transaksi Deleted"});
    } catch (error) {
        res.json({ message: error.message });
    }
}