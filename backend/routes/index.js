import express from "express";
import { createBuku, deleteBuku, getAllBuku, getBukuById, updateBuku, searchBuku } from "../controllers/buku.js";

const router = express.Router();

router.get('/', getAllBuku);
router.get('/search', searchBuku);
router.get('/:id', getBukuById);
router.post('/', createBuku);
router.patch('/:id', updateBuku);
router.delete('/:id', deleteBuku);

export default router;