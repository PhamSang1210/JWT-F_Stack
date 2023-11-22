import verifyToken from "./verifyToken.js";

class VerifyTokenAndAdmin {
    VerifyTokenAndAdmin(req, res, next) {
        verifyToken.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.admin) {
                next();
            } else {
                res.status(301).json("YOU'RE NOT ALLOWED TO DELETE OTHER");
            }
        });
    }
}

export default new VerifyTokenAndAdmin();
