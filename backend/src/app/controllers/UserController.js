import UserShema from "../model/UserModel.js";

class UserController {
    async updateUser(req, res) {
        try {
            const updateUser = await UserShema.updateOne(
                { _id: req.params.id },
                req.body
            );
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(301).json(error);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserShema.findById(req.params.id);
            res.status(200).json("DELETE SUCCESSFULLY");
        } catch (error) {
            res.status(301).json("DELETE ERROR");
        }
    }

    async getAllUsers(req, res) {
        try {
            const user = await UserShema.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(301).json(error);
        }
    }
}

export default new UserController();
