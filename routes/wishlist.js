const express = require("express");
const router = express.Router({ mergeParams: true });
const wishlistController = require("../controllers/wishlistController");


// Matches with "/api/wishlist/:userId/:itemId" 
router.route("/:itemId")
    .put(wishlistController.addWishlistItemUser);

//the items will be removed from all wishlists when an owner removes them from his items
/* router.route("/delete/:userId/:itemId")
    .put(wishlistController.deleteWishlistItem); */
//wishitem should be deleted from the wishlist when it is deleted from the items (in the items controller)

module.exports = router;