import Buku from "../models/bukuModels.js";
import { Op } from "sequelize";

export const getAllBuku = async (req, res) => {
    try {
        const buku = await Buku.findAll();
        res.json(buku);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const searchBuku = async (req, res) => {
    try {
        let search = req.query.query;
        
        search = search.toLowerCase();
        console.log(search);

        const buku = await Buku.findAll({ where: { judul: { [Op.like]: `%${search}%` } } });
        res.json(buku);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getBukuById = async (req, res) => {
    try {
        const buku = await Buku.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(buku[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createBuku = async (req, res) => {
    try {
        await Buku.create(req.body);
        res.json({"message": "Buku Created"});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateBuku = async (req, res) => {
    try {
        await Buku.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({"message": "Buku Updated"});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteBuku = async (req, res) => {
    try {
        await Buku.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({"message": "Buku Deleted"});
    } catch (error) {
        res.json({ message: error.message });
    }
}