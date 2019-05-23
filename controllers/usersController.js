const db = require("../models");

// Defining methods for the usersController
module.exports = {
    //the method to get a user's info based on his/her id
    getUser: async function (req, res, next) {
        try {
            console.log("inside getUser " + req.params);
            let userInfo = await db.Person.findOne({
                    _id: req.params.id
                })
                .populate('items')
                .populate('wishlist');
            return res.status(200).json(userInfo);
        } catch (err) {
            return next(err);
        }
    },
    //this method to find a user based on the users id and update her/his info
    updateUser: async function (req, res, next) {
        try {
            let user = await db.Person.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                new: true
            });
            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    },
};
/* //get method to retrieve all users - for testing only, remove before deploying - tested
    findUsers: function (req, res) {
        db.Person
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //the method to add a new user to Persons document
     addUser: function (req, res) {
         db.Person
             .create(req.body)
             .then(dbModel => {
                 console.log(dbModel);
                 res.status(201).json(dbModel);
             })
             .catch(err => {
                 console.log(err);
                 res.status(422).json(err);
             });
     }, */
/* //this method to find a user based on the users id and update her/his info
updateUser: function (req, res) {
    db.Person.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
    )
        .then(dbModel => {
            console.log(dbModel);
            res.status(201).json(dbModel)
        }
        )
        .catch(err => res.status(422).json(err));
}, */
/* //the method to get a user's info based on his/her id
getUser: function (req, res) {

    db.Person.findOne({ _id: req.params.id })
        .populate('items')
        .populate('wishlist')
        .then(dbModel => {
            console.log(dbModel);
            res.status(201).json(dbModel)
        }
        )
        .catch(err => res.status(422).json(err));
} */