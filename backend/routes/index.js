import express from "express";
import { createBuku, deleteBuku, getAllBuku, getBukuById, updateBuku, searchBuku } from "../controllers/buku.js";
import { getAllTransaksi, createTransaksi, updateTransaksi,
     deleteTransaksi, getTransaksiByUsername, getTransaksiById } from "../controllers/transaksi.js";

const router = express.Router();

// API Buku
router.get('/buku/', getAllBuku);
router.get('/buku/search', searchBuku);
router.get('/buku/:id', getBukuById);
router.post('/buku/', createBuku);
router.patch('/buku/:id', updateBuku);
router.delete('/buku/:id', deleteBuku);

// API Transaksi
router.get('/transaksi/', getAllTransaksi);
router.get('/transaksi/user/:username', getTransaksiByUsername);
router.get('/transaksi/:id', getTransaksiById);
router.post('/transaksi/', createTransaksi);
router.patch('/transaksi/:id', updateTransaksi);
router.delete('/transaksi/:id', deleteTransaksi);

export default router;