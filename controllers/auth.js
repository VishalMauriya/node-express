const db = require('../utils/db');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const nodemailer = require('nodemailer')
const sendGridtransport = require('nodemailer-sendgrid-transport')
const { validationResult } = require('express-validator');
const { json } = require('body-parser');

const transporter = nodemailer.createTransport(sendGridtransport({
    auth: {
        api_key: 'get-from-sendgrid' 
    }
}))

exports.signupController = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    const image = req.file;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        next(new Error(errors.array()[0].msg))
      }
      bcrypt.hash(password, saltRounds, (err, hash) => {
        password = hash;
        user.create({
            email: email,
            password: password,
            imagepath: image.path
        })
        .then(result => {
            console.log(result);
            transporter.sendMail({
                to: email,
                from: 'test@test.com',
                subject: 'Regarding testing mailer!',
                html: "<h1>Hello you'r signed up successfully!</h1>"
            }, (err, info) => {
                res.render('home', {
                    data : result[0]
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }) 
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     password = hash;
    //     var sql = "INSERT INTO users (email, password, imagepath) VALUES(?, ?, ?)";
    //     db.execute(sql, [email, password, image.path])
    //     .then(result => {
    //         console.log(result);
    //         transporter.sendMail({
    //             to: email,
    //             from: 'test@test.com',
    //             subject: 'Regarding testing mailer!',
    //             html: "<h1>Hello you'r signed up successfully!</h1>"
    //         }, (err, info) => {
    //             res.render('home', {
    //                 data : result[0]
    //             })
    //         })
    //     })
    //     .catch(err => {
    //         console.log('failed to create table', err)
    //     });
    // }) 
}

exports.fetchUsers = async (req, res, next) => {
    const users = await user.findAll();
    console.log(JSON.stringify(users));
    res.render('home', {
        data : users
    })
    // var sql = "SELECT * FROM users";
    //     db.execute(sql)
    //     .then(result => {
    //         res.render('home', {
    //             data : result[0]
    //         })
    //     })
    //     .catch(err => {
    //         console.log('failed to create table', err)
    //     });
}

exports.loginController = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await user.findAll({where: {email: email}});

    if(!existingUser){
        next(new Error('user not found'));
    }

    // if (password === existingUser[0].password){
    //     console.log('User logged in');
    //     res.render('home', {
    //         data : existingUser[0]
    //     })
    // }else {
    //     console.log('unable to login, password wrong');
    // }
    console.log(JSON.stringify(existingUser[0].password));
};