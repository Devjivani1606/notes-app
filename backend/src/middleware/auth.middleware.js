const jwt = require("jsonwebtoken");
const response = require("../utils/response");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.error(res, "Access Denied: No Token Provided", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
        req.user = decoded;
        next();
    } catch (err) {
        return response.error(res, "Invalid Token", 401);
    }
};
