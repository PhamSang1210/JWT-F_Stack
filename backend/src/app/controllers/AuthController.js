import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let refreshTokens = [];
class AuthController {
    async register(req, res) {
        try {
            const exitsingUser = await UserModel.findOne({
                username: req.body.username,
            });

            if (exitsingUser) {
                return res.status(200).json("USERNAME EXITS");
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = await new UserModel({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
            });
            const newUser = await user.save();

            res.status(200).json(newUser);
        } catch (error) {
            res.status(301).json(error);
        }
    }

    async login(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username,
            });
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!user) res.status(301).json("WRONG USERNAME");
            if (!validPassword) res.status(301).json("WRONG PASSWORD");

            if (user && validPassword) {
                const accessToken = jwt.sign(
                    {
                        username: user.username,
                        id: user.id,
                        admin: user.admin,
                    },
                    process.env.JWT_ACCESS_TOKEN,
                    {
                        expiresIn: "25s",
                    }
                );
                const refreshToken = jwt.sign(
                    {
                        username: user.username,
                        id: user.id,
                        admin: user.admin,
                    },
                    process.env.JWT_REFRESH_TOKEN,
                    {
                        expiresIn: "7d",
                    }
                );
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: false,
                    path: "/",
                });
                const { password, ...others } = user._doc;

                res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            res.status(301).json(error);
        }
    }

    refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) res.status(301).json("WRONG REFESHTOKEN");
        if (!refreshTokens.includes(refreshToken))
            res.status(301).json("REFRESH TOEN NO EXITS");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) res.status(301).json("refreshToken invalid");
            const newAccessToken = jwt.sign(
                {
                    username: user.username,
                    id: user.id,
                    admin: user.admin,
                },
                process.env.JWT_ACCESS_TOKEN,
                {
                    expiresIn: "20s",
                }
            );

            refreshTokens = refreshTokens.filter(
                (token) => token != refreshToken
            );

            const newRefreshToken = jwt.sign(
                {
                    username: user.username,
                    id: user.id,
                    admin: user.admin,
                },
                process.env.JWT_REFRESH_TOKEN,
                {
                    expiresIn: "7d",
                }
            );
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false,
                path: "/",
            });

            res.status(200).json({ accessToken: newAccessToken, refreshToken });
        });
    }

    logoutUser(req, res) {
        res.clearCookie("refreshToken");
        res.status(200).json("LOGOUT SUCCESSFULLY");
    }
}

export default new AuthController();
