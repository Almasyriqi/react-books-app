import { Sequelize } from "sequelize";
import db from "../config/db.js";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

const user_role = {};
user_role.Sequelize = Sequelize;
user_role.db = db;
user_role.user = User;
user_role.role = Role;
user_role.role.belongsToMany(user_role.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
user_role.user.belongsToMany(user_role.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
user_role.ROLES = ['user', 'admin'];

export default user_role;