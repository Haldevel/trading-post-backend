const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
    // finding a user
    try {
        let person = await db.Person.findOne({
            email: req.body.email  //check if we should use id? 
        });
        let {
            _id,
            userName,
            profilePic
        } = person;
        let isMatch = await person.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                    _id,
                    userName,
                    profilePic
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                _id,
                userName,
                profilePic,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
};


exports.signup = async function (req, res, next) {
    try {
        //create a user in the db based on the req 
        let person = await db.Person.create(req.body);
        let {
            _id,
            userName,
            profilePic
        } = person; //get the needed data from the user by destruturing
        //create a token using a payload and a secret key
        let token = jwt.sign({
                _id,
                userName,
                profilePic
            },
            process.env.SECRET_KEY //we are using our env variable that lives in process.env
        );
        return res.status(200).json({ //on successfull signup we return status 200 in the response and all the data we need such as a new id and token too
            _id,
            userName,
            profilePic,
            token
        });
    } catch (err) {
        if (err.code === 11000) { //if validation fails
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};