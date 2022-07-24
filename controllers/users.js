const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');
const apiresponse = require('./apirespose');

exports.User_getapi = async (req, res) => {
    // res.json('ok')
    // axios.get('https://imdb-api.com/API/Search/k_12345678/lost%202004')
    //     .then(function (response) {
    //         console.log(response.data)
    //         res.json(response.data)
    //     })
    const title = req.body.title;
    // const api = await axios({
    //     method: 'get',
    //     url: 'https://imdb-api.com/API/Search/k_12345678/' + title
    // })
    //     .then(function (response) { return response.data })
    //     .catch(function (error) {
    //         return error
    //     })
    const ferdy = await axios({
        method: 'get',
        url: 'http://192.168.18.71/latihan_laravel/public/post',
    })
        .then(function (response) { return response.data })
        .catch(function (error) {
            return error
        })
    // .then(function (response, next) {
    //     console.log(response.data);
    //     data.dataresponse = response.data;
    // })
    var data = {};
    // data.api = api;
    data.ferdy = ferdy;
    data.status = "success";
    res.json(apiresponse.response(ferdy, 'sucess'));
}

exports.User_postuser = async (req, res) => {
    // Send a POST request
    const title = req.body.title
    const content = req.body.content
    const status = req.body.status
    const data = await axios({
        method: 'post',
        url: 'http://192.168.18.71/latihan_laravel/public/post',
        data: {
            title: title,
            content: content,
            status: status,
        }
    }).then((response) => { return response.data }).catch((err) => { return err });

    res.json(apiresponse.response(data, 'success api'))
}

exports.User_login = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}
exports.User_register = async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}