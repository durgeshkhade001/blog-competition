var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    rollno: { type: String, required: true, unique: true },
    branch: { type: String, required: true},
    year: { type: String, required: true},
    division: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    verificationCode: { type: String },
    verified: { type: Boolean, default: false },
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err, false);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);