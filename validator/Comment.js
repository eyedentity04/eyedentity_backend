const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateComment(data) {
    let errors = {}

    data.commentText = !isEmpty(data.commentText) ? data.commentText : ""

    if(Validator.isEmpty(data.commentText)){
        errors.commentText = "You can not input empty comment"
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }

}