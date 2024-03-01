const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    const info = err.extraDetails || "Error";

    return res.status(status).json({ message, info });
}

export default errorMiddleware