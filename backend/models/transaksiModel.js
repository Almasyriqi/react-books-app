import { Sequelize } from "sequelize";
import db from "../config/db.js";
import User from "./userModel.js";
import Buku from "./bukuModels.js";
const { DataTypes } = Sequelize;

const Transaksi = db.define('transaksi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jumlah: {
        type: DataTypes.INTEGER
    },
    total: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

Buku.belongsToMany(User, {
    through: Transaksi,
    foreignKey: "buku_id",
    otherKey: "user_id"
});
User.belongsToMany(Buku, {
    through: Transaksi,
    foreignKey: "user_id",
    otherKey: "buku_id",
});

export default Transaksi;