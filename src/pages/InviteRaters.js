import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';

const date = new Date().toDateString("en-us");

class InviteRaters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invitationsSent: false,
            seeEmails: false,
            raters: this.props.raters,
            players: this.props.players,
            session: this.props.session,
        }

        this.sendInvites = this.sendInvites.bind(this);
        this.toggleEmails = this.toggleEmails.bind(this);
    }

    sendInvites = () => {
        const session = this.state.session;
        console.log("session: ", session);

        const sessionObject = {
            date: session.date || date,
            color: "danger",
            completed: false,
            players: this.state.players, //dont forget to change schema and refresh server with every update!
        }

        if (session._id) {
            console.log("You have a loaded session! ", session);
            fetch("/session").then(res => {
                console.log("res is: ", res);
                if(res.ok) { return res.json()}
            })
                .then(jsonRes => {
                    console.log("JSON: ",jsonRes);
                    sessionObject.id = session.id; 
                    sessionObject.raters = this.state.raters.map(rater => {
                        let emailTemplate = {
                            name: rater[0],
                            email: rater[1],
                            message: "Change these instructions later. Most likely, you should have some sort of web link here so that raters can follow that link to the rating app created just for them. Good luck, amigo!",
                            date: date,
                        }
                        // emailjs.send('service_kc8f3pz','VBA_rater_invite', emailTemplate,'-ddp6NqroMoy1LpaE')
                        // .then(function(response) {
                        //     console.log('SUCCESS!', response.status, response.text);
                        // }, function(error) {
                        //     console.log('FAILED...', error);
                        // });

                        return rater;
                    });
                    console.log("Entire session object: ", sessionObject);
                    axios.put('http://localhost:3001/session',sessionObject)
                });
        } else {
            fetch("/session").then(res => {
                console.log("res is: ", res);
                if(res.ok) { return res.json()}
            })
                .then(jsonRes => {
                    console.log("JSON: ",jsonRes);
                    sessionObject.id = jsonRes.length;
                    sessionObject.raters = this.state.raters.map(rater => {
                        let emailTemplate = {
                            name: rater[0],
                            email: rater[1],
                            message: "Change these instructions later. Most likely, you should have some sort of web link here so that raters can follow that link to the rating app created just for them. Good luck, amigo!",
                            date: date,
                        }
                        // emailjs.send('service_kc8f3pz','VBA_rater_invite', emailTemplate,'-ddp6NqroMoy1LpaE')
                        // .then(function(response) {
                        //     console.log('SUCCESS!', response.status, response.text);
                        // }, function(error) {
                        //     console.log('FAILED...', error);
                        // });

                        return rater;
                    });
                    console.log("Entire session object: ", sessionObject);
                    axios.post('http://localhost:3001/session',sessionObject)
                });
    
            this.setState({invitationsSent:true, seeEmails: false});
        }
    }

    toggleEmails() {
        this.setState({
            seeEmails: !this.state.seeEmails,
        })
    }

    render () {
        console.log("Invite Raters: ", this.state);
        const {raters, players} = this.state;

        const playersList = players.map(player => {
            return (
                <h4 key={player[0]}>{player[0]}</h4>
            )
        });
        const ratersList = raters.map(rater => {
            return (
                <h4 key={rater[0]}>{rater[0]}</h4>
            )
        });
        const ratersEmails = raters.map(rater => {
            return (
                <h5 key={rater[0]}>{rater[0]} — {rater[1]}</h5>
            )
        });

        return (
            <div>
                {!this.state.invitationsSent? 
                    <h5 className="header" >Review the Raters and Players in your Ratings Session</h5> : 
                    <div className='header'>
                        <h1>An email has been sent to the following raters: </h1>
                        {this.state.seeEmails ? 
                            <div>{ratersEmails}</div> : 
                            <div>{ratersList}</div>
                        }
                    </div>
                
                }
                {!this.state.invitationsSent?
                    <div className='header'>
                        <h1>Total Raters: {raters.length}</h1>
                        {this.state.seeEmails ? 
                            <div>{ratersEmails}</div> : 
                            <div>{ratersList}</div>
                        }
                        <h1 className='header'>Total Players: {players.length}</h1>
                        {playersList}
                        <h6 style={{marginTop: "5%"}}>Click send to invite your raters to join in today's rating session. They'll receive emails so they can automatically link into the session. </h6> 
                    </div>
                    : null
                }
                <div className='header' style={{marginTop: "0px", marginBottom: "20px"}}>
                    <div className="row">
                        <div className="col">
                            <Button color="warning" size='lg' onClick={() => this.toggleEmails()}>Check 👀📧</Button>
                        </div>
                        <div className="col"><Link to="/">
                            <Button color="danger" size='lg'>Edit ✒️</Button></Link>
                        </div>
                        <div className="col"> 
                            { this.state.invitationsSent ? 
                                <Link to="/raterHome"><Button color= "success" size='lg'>Start 🔥</Button></Link> :
                                <Button color="success" size='lg' onClick={() => this.sendInvites()}>Send 📨</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InviteRaters;