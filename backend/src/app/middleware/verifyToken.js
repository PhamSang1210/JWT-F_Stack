import jwt from "jsonwebtoken";
class VerifyToken {
    verifyToken(req, res, next) {
        const token = req.headers.token;
        const accessToken = token.split(" ")[1];
        if (!token) return res.status(302).json("TOKEN IN VALID");

        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(301).json("WRONG TOKEN INVALID");
            req.user = user;
            next();
        });
    }
}

export default new VerifyToken();
