const db = require("../models");
//const axios = require("axios");

// Defining methods for the itemsController
module.exports = {
    //get method to retrieve all items and sort them
    getAllItems: function (req, res) {
        var sort;
        if (req.params.sortMethod === "dateDown") {
            sort = -1;
        } else if (req.params.sortMethod === "dateUp") {
            sort = 1;
        }
        db.Item
            .find({})
            .limit(12)
            .sort({
                createdAt: sort
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //ADDED ON 05/21
    addItem: async function (req, res, next) {
        try {
            let item = await db.Item.create({
                //_owner: req.body._owner,
                _owner: req.params.userId,
                title: req.body.title,
                picture: req.body.picture,
                description: req.body.description,
                category: req.body.category,
                condition: req.body.condition
                //user: req.params.id
            });
            console.log("Inside  addItem " + req.params.userId + " " + req.params._id + " " + req.params.id);

            let foundPerson = await db.Person.findById(req.params.userId);
            foundPerson.items.push(item._id); //???
            await foundPerson.save();
            let foundItem = await db.Item.findById(item._id).populate("person", {
                userName: true,
                profilePic: true
            });
            return res.status(200).json(foundItem);
        } catch (err) {
            return next(err);
        }
    },
    //END ADDING ON 05/21

    //added on 05/22
    getSingleItem: async function (req, res, next) {
        try {
            let item = await db.Item.findById(req.params.itemId);
            return res.status(200).json(item);
        } catch (err) {
            return next(err);
        }
    },
    //the method to update an item based on its id
    updateItem: async function (req, res, next) {
        try {
            console.log("itemId" + req.params.itemId);
            let item = await db.Item.findOneAndUpdate({
                _id: req.params.itemId
            }, {
                $set: {
                    title: req.body.title,
                    picture: req.body.picture,
                    description: req.body.description,
                    condition: req.body.condition
                }
            }, {
                new: true
            })
            return res.status(200).json(item);
        } catch (err) {
            return next(err);
        }
    },
    deleteItem: async function (req, res, next) {
        try {
            let foundItem = await db.Item.findById(req.params.itemId);
            await foundItem.remove();
            return res.status(200).json(foundItem);
        } catch (err) {
            return next(err);
        }
    }
    //end added on 5/22



    //COMMENTED OUT ON 05/21
    /* //the method to add an item to the collection of items and add the corresponding item to the items of the specified user
    addItem: function (req, res) {

        // axios.post("https://api.imgur.com/3/upload", {
        //     datatype: "multipart/form-data",
        //     headers: {
        //         "Authorization": "Client-ID 8bc6ab7f6927702"
        //     },
        //     data: req.body.picture,
        //     cache: false,
        //     contentType: false,
        //     processData: false
        // }).then(imgur => {

        db.Item
            .create({
                _owner: req.body._owner,
                title: req.body.title,
                picture: req.body.picture,
                description: req.body.description,
                category: req.body.category,
                condition: req.body.condition
            })
            .then(dbModel => {
                db.Person.findOneAndUpdate({ _id: req.params.userId }, { $push: { items: dbModel._id } }).then(dbModel => console.log(dbModel));

                res.status(201).json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
        


    }, */
    //END COMMENTING OUT ON 05/21

    /* deleteItem: function (req, res) {
        db.Person
            .findOneAndUpdate({
                _id: req.params.userId
            }, {
                $pull: {
                    items: req.params.itemId
                }
            })
            .then(dbModel => {
                console.log("The item was deleted from the items of " + dbModel.name);
                db.Item.remove({
                    _id: req.params.itemId
                }).then(() => console.log("Item deleted"))
                res.json(dbModel)
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });


    }, */
    /* //the method to update an item based on its id
    updateItem: function (req, res) {
        db.Item.findOneAndUpdate({
                _id: req.params.itemId
            }, {
                $set: {
                    title: req.body.title,
                    picture: req.body.picture,
                    description: req.body.description,
                    condition: req.body.condition
                }
            })
            .then(db => {
                res.json(db);
            })
    }, */
    /* getSingleItem: function (req, res) {
        db.Item.findById({
            _id: req.params.itemId
        }).then(dbModel => res.json(dbModel))
    } */
};