var express = require('express');
const { isundefined } = require('./controller/lib/auth/checkIfUndefined');
const { checkIsEmpty } = require('./controller/lib/auth/checkisEmpty');
const { validateCreateData } = require('./controller/lib/auth/validateCreateData');
var router = express.Router();
const { createUser, login,  } = require('./controller/userController-v2')

/* GET users listing. */
// router.get('/', getAllUsers)

router.post('/create-user', isundefined, checkIsEmpty, validateCreateData, createUser)

router.post('/login', isundefined, checkIsEmpty, login)


module.exports = router;
