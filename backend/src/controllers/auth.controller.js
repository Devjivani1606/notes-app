const AuthService = require("../services/auth.service");

const response = require("../utils/response");

exports.register = async (req, res) => {

    try {

        const user = await AuthService.register(
            req.body.name,
            req.body.email,
            req.body.password
        );

        return response.success(
            res,
            "User Registered Successfully",
            user,
            201
        );

    } catch (err) {

        return response.error(
            res,
            err.message,
            400
        );
    }

};

exports.login = async (req, res) => {

    try {

        const result = await AuthService.login(
            req.body.email,
            req.body.password
        );

        return response.success(
            res,
            "User Logged In Successfully",
            result,
            200
        );

    } catch (err) {

        return response.error(
            res,
            err.message,
            400
        );
    }

};