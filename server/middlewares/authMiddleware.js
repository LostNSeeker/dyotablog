const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, "secret@a5debf3dde6e51c0ea3064175e210589b99335ffa3a53cb51f44999faacfab83f2ce3bc972c43eeba720e5fffaead000b114c109edf92bd4d35776f6c0e4ae2c");
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
