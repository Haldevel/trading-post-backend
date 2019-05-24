const db = require("../models");
//mongoose.set('useFindAndModify', false);

// Defining methods for the wishlistController
module.exports = {
//method to add an item to wishlist
addWishlistItemUser: async function (req, res, next) {
  try {
    let foundPerson = await db.Person.findOneAndUpdate({
      _id: req.params.userId
    }, {
      $push: {
        wishlist: req.params.itemId
      }
    });
    let userInfo = await db.Person.findOne({
        _id: req.params.userId
      })
      .populate('items')
      .populate('wishlist');
    return res.status(200).json(userInfo);
  } catch (err) {
    return next(err);
  }
}
};
/*  addWishlistItemUser: function (req, res) {
   db.Person
     .findOneAndUpdate({ _id: req.params.userId }, { $push: { wishlist: req.params.itemId } })
     .then(dbModel => {
       console.log("The item is added to the wishlist: " + dbModel);
       res.status(201).json(dbModel);
     })
     .catch(err => {
       console.log(err);
       res.status(422).json(err);
     });
   //.catch(err => res.send(err));
 }, */

/* deleteWishlistItem: function (req, res) {
  db.Person
    .findOneAndUpdate({
      _id: req.params.userId
    }, {
      $pull: {
        wishlist: req.params.itemId
      }
    })
    .then(dbModel => {
      console.log("The item was deleted from the wishlist of " + dbModel.name);
    })
    .catch(err => {
      console.log(err);
      res.status(422).json(err);
    });
  //.catch(err => res.send(err));
}, */



