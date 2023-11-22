import authRouter from "./auth.js";
import userRouter from "./user.js";
function route(app) {
    app.use("/v1/auth", authRouter);
    app.use("/v1/user", userRouter);
}

export default route;
