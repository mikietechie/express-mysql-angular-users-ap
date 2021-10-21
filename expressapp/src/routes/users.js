var express = require('express');
var router = express.Router();
var connection = require('../lib/db');
 
// display users page
router.get('/users', function(req, res, next) {
    connection.query('SELECT * FROM users', function(err,rows)     {
        if (err) {
            res.end([])
        } else {
            res.send(rows)
        }
    });
});

// add a new user
router.post('/add', function(req, res, next) {

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let subjects = req.body.subjects;
    let errors = false;

    if(name.length === 0 || email.length === 0) {
        errors = true;
        res.send({error: "error"})
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            email: email,
            phone: phone,
            subjects: subjects,
        }
        
        // insert query
        connection.query('INSERT INTO users SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                res.end({error: "DB failed"})
            } else {                
                res.end({success: "Success"})
            }
        })
    }
})

// update user data
router.post('/update/:id', function(req, res, next) {

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let subjects = req.body.subjects;
    let errors = false;

    if(name.length === 0 || email.length === 0) {
        errors = true;
        res.end({error: "error"})
    }

    // if no error
    if( !errors ) {

        var form_data = {
            name: name,
            email: email,
            phone: phone,
            subjects: subjects,
        }
        // update query
        connection.query('UPDATE users SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                res.end({error: "DB failed"})
            } else {                
                res.end({success: "Success"})
            }
        })
    }
})
   
// delete user
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM users WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            res.end({error: "DB failed"})
        } else {                
            res.end({success: "Success"})
        }
    })
})

module.exports = router;