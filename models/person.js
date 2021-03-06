const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const personSchema = Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: "Username is required.",
        unique: true
    },
    email: {
        type: String,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: "Email cannot be blank",
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    profilePic: {
        type: String,
        trim: true,
        default: "https://www.sccpre.cat/mypng/detail/26-268559_profile-picture-placeholder-round.png"
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be at least 6 characters long."
        ]
    },
    bio: {
        type: String,
        trim: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    timestamps: true
});

//added on May 21 pre save hook
personSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

personSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};



var Person = mongoose.model('Person', personSchema);

module.exports = Person;