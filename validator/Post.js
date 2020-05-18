const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserPost (data) {
    let errors = []

    data.like = !isEmpty(data.like) ? data.like : []

    if(!Validator.isEmpty(data.like)){
        errors.like = "kau sudah like tak boleh like lagi"
    }

    return{
        errors,
        isValid : isEmpty(errors)
    }

}

