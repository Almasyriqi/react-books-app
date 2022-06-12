import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

export const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
export const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
export const adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}
export const getAllUser = async (req, res) => {
    try {
        const user = await User.findAll({
            include: Role
        });
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}