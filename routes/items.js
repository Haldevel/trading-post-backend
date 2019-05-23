const express = require("express");
const router = express.Router({ mergeParams: true });  //if we have multiple params

const itemController = require("../controllers/itemsController");

/* router.route("/:sortMethod")             //need to think how to update this route!
    .get(itemController.getAllItems) */

//api/items/:userId/item/:itemId    
router.route("/item/:itemId")
    .delete(itemController.deleteItem)
    .get(itemController.getSingleItem)
    .put(itemController.updateItem)

//api/items/:userid
router.route("/")  
    .post(itemController.addItem)

module.exports = router;