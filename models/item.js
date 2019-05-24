const mongoose = require('mongoose');
const Person = require('./person');
const Schema = mongoose.Schema;

var itemSchema = Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  title: {
    type: String,
    trim: true,
    default: "",
    required: true
  },
  picture: {
    type: String,
    default: "",
    required: true
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  condition: {
    type: String,
    trim: true,
    default: "",
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Books', 'Electronics', 'Jewelry', 'Tools', 'Clothing', 'Furniture', 'Games', 'Sports Equipment', 'Appliances'],
    default: 'General'
  }
}, { timestamps: true });

itemSchema.index({title: 'text', category: 'text'});

//hook before removing an item
itemSchema.pre("remove", async function(next) {
  try {
    // find a user
    let person = await Person.findById(this._owner); //???
    // remove the id of the item from their items list using mongoose sync function
    person.items.remove(this.id);
    // save that user
    await person.save();
    //remove the item from all wishlists
    const result1 = await Person.updateMany(
      {  },
      { $pull: { wishlist: { $in: [mongoose.Types.ObjectId(this.id)] } } },
      { strict: false }
    );
    return next();
  } catch (err) {
    return next(err);
  }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;

