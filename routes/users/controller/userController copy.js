const User = require('../model/user');
const {
  isEmpty, 
  isAlpha,
  isAlphaNumeric, 
  isEmail,
  isStrongPassword,
} = require('validator');


async function validateName(name) {
    if (name.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
        return true 
      } else {
          return false
      }
}

async function checkIsEmpty(target) {
    if(target.length === 0) {
        return true;
    } else {
        return false;
    }
}

async function validatePassword(password) {
if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
    return true;
}else {
    return false;
}
}

async function createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body;
    let body = req.body;
    //How would you validate firstName to make sure only alphabet is allowed
    let errObj = {};
  
    for (let key in body) {
      if (checkIsEmpty(body[key])) {
        errObj[`${key}`] = `${key} cannot be empty`;
      }
    }
  
    if (validateName(firstName)) {
      errObj.firstName = "First Name cannot have special characters or numbers";
    }
  
    if (validateName(lastName)) {
      errObj.lastName = "last Name cannot have special characters or numbers";
    }
    
    if (validatePassword(password)) {
        errObj.password = "Password must contain at least 8 characters, at least one uppercase and lowercase letter\n a number, and special character"
    }
  
    if (Object.keys(errObj).length > 0) {
      return res.status(500).json({
        message: "error",
        error: errObj,
      });
    }
  
    try {
      const createdUser = new User({
        firstName,
        lastName,
        username,
        email,
        password,
      });
  
      let savedUser = await createdUser.save();
  
      res.json({ message: "success", payload: savedUser });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.message });
    }
  }
    const getAllUsers = async (req,res) => {
        try{
           let payload = await User.find(req.body)

           res.json({ message: "success", payload})
        }catch(error){
            res.status(500).json({ message: "failure", error: error.message})
        }
    }

module.exports = {
    createUser,
    getAllUsers,
}