const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatorRegisterInput(data) {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.name)) {
    error.name = "please input your name";  
  }

  if(!Validator.isLength(data.name,{min : 5 , max : 20})){
    error.name = "name must be at least 5 and maxiaml 20"
  }

  if (Validator.isEmpty(data.email)) {
    error.email = "email require";
  }else if (!Validator.isEmail(data.email)) {
    error.email = "email is invalid or email is registered";
  }
  

  if (Validator.isEmpty(data.password)) {
    error.password = "password is required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    error.password = "pasword must be at least 8 character and maximal 30";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    error.confirmPassword = "confirm password is required";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    error.confirmPassword = "password must be match";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
