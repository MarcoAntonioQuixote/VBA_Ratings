const express = require('express');
const router = express.Router();
const Session = require('../models/session');


//why is this working at route?? I don't understand it quite yet
router.route("/session").post((req,res) => {
    const date = req.body.date;
    const raters = req.body.raters;
    const players = req.body.players;
    const id = req.body.id;
    const color = req.body.color;
    const completed = req.body.completed;
    const newSession = new Session({
        id,
        date,
        raters,
        players,
        color,
        completed,
    });

    newSession.save();
});

// router.route("/updateRatingsSession").put((req, res) => {
    
// })

router.route('/session').get((req,res) => {
    Session.find()
        .then(createdSession => res.json(createdSession))
})

router.route('/session/:id').put((req,res) => {
    Session.findById(req.params.id)
    .then(session => {
        
        console.log("this was returned from promise (found in ID)", session);
        session.raters = req.body.raters;
        session.players = req.body.players;
        session.id = req.body.id;

        session.save()
            .then(() => res.json('Session updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ', + err));
});

router.route('/session/:id/:raterEmail').put((req,res) => {
    console.log("req is: ", req.body); //req.body = organizing data (multi-dimensional array)
    Session.findById(req.params.id)
    .then(session => {
        let index;
        console.log("this is the data we are replacing: ", session);
        console.log("This is who we are replacing it for: ", req.params.raterEmail);

        session.raters.map(rater => {
            if (rater.email.toLowerCase() === req.params.raterEmail.toLowerCase()) {
                index = session.raters.indexOf(rater);
                session.raters[index] = req.body;


                // if (req.body.finished) {
                //     session.raters[index] = req.body;
                // } else {
                //     session.raters[index] = [
                //         session.raters[index][0],
                //         session.raters[index][1],
                //         req.body]; 
                // } OBJECT CHECK *** I think this was differentiating between when you finalized it as an object and each rater was an array
            }
        })

        session.save()
            .then(() => res.json('Session updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ', + err));
});

module.exports = router;
