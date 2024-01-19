
const express = require('express'); 
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../controllers/auth');


router.get('/', (req, res) => { 
    res.render('login'); 
});

router.get('/login', (req, res) => { 
    res.render('login'); 
});

router.get('/home', auth.fetchUsers);

router.post('/signup',  
[
    body("email", "Enter a valid email").isEmail(),
    body("password").trim() 
    .isLength({min:4}) 
    .withMessage('Password must be minimum 4 characters long') 
    .isAlphanumeric() 
    .withMessage('Password must be alphanumeric') 
],
auth.signupController);

router.post('/login', auth.loginController);

module.exports =  router;
