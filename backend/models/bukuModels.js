import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Buku = db.define('buku', {
    judul:{
        type: DataTypes.STRING
    },
    penerbit:{
        type: DataTypes.STRING
    },
    penulis:{
        type: DataTypes.STRING
    },
    keterangan:{
        type: DataTypes.STRING
    },
    stok:{
        type: DataTypes.INTEGER
    },
    gambar:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default Buku;