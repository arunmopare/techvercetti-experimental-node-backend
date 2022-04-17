const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            error: "Unauthorized Request 1",
        });
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
        return res.status(401).json({
            error: "Unauthorized Request 2",
        });
    }
    try {
        let payload = jwt.verify(token, process.env.SECRET);
        if (!payload) {
            return res.status(401).json({
                error: "Unauthorized Request 3",
            });
        }
        req.userPayloadId = payload._id;

        next();
    } catch (error) {

        return res.status(400).json({ msg: "Errors: Something went wrong." });
    }
};
