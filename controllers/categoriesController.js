const db = require("../models");

// Defining methods for the booksController
module.exports = {
    //method to searchitems by category and a search term
    categorySearch: async function (req, res, next) {
        try {
            let items = await db.Item
                .find({
                    $text: {
                        $search: req.params.searchTerm + '"' + req.params.category + '"'
                    }
                }, {
                    score: {
                        $meta: "textScore"
                    }
                })
                .sort({
                    score: {
                        $meta: 'textScore'
                    }
                })
            return res.status(200).json(items);

        } catch (err) {
            return next(err);
        }        
    },
};

/*  //the method to get all items in a category
 getCategory: function (req, res) {
     db.Item
         .find({ category: req.params.category })
         .then(dbModel => {
             console.log(dbModel);
             res.status(201).json(dbModel);
         })
         .catch(err => {
             console.log(err);
             res.status(422).json(err);
         });
 }, */
/* categorySearch: function (req, res) {
    db.Item
        .find(
            { $text: { $search: req.params.searchTerm + '"' + req.params.category + '"' } },
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: 'textScore' } })
        .then(dbModel => {
            console.log(dbModel);
            res.status(201).json(dbModel);
        })
        .catch(err => {
            console.log(err);
            res.status(422).json(err);
        });
} */