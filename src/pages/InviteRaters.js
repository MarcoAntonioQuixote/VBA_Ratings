import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import emailjs from 'emailjs-com';

const date = new Date().toDateString("en-us");

class InviteRaters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            invitationsSent: false,
            seeEmails: false,
            raters: this.props.raters,
            players: this.props.players,
        }

        this.sendInvites = this.sendInvites.bind(this);
        this.toggleEmails = this.toggleEmails.bind(this);
    }

    sendInvites = () => {
        
        this.state.raters.map(rater => {
            let emailTemplate = {
                name: rater[0],
                email: rater[1],
                message: "Change these instructions later. Most likely, you should have some sort of web link here so that raters can follow that link to the rating app created just for them. Good luck, amigo!",
                date: date,
            }

            // emailjs.send('service_kc8f3pz','VBA_rater_invite', emailTemplate,'-ddp6NqroMoy1LpaE')
            //     .then(function(response) {
            //         console.log('SUCCESS!', response.status, response.text);
            //     }, function(error) {
            //         console.log('FAILED...', error);
            //     });
        });

        this.setState({invitationsSent:true, seeEmails: false});

    };

    toggleEmails() {
        this.setState({
            seeEmails: !this.state.seeEmails,
        })
    }

    render () {
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
                    <div className='header'>
                        <h1 className='header'>Total Players: {players.length}</h1>
                        {playersList}
                        <h1 className='header'>Total Raters: {raters.length}</h1>
                        {this.state.seeEmails ? 
                            <div>{ratersEmails}</div> : 
                            <div>{ratersList}</div>}
                        <h6 style={{paddingInline: "20%", marginTop: "5%"}}>Click send to invite your raters to join in today's rating session. They'll receive emails so they can automatically link into the session. </h6> 
                    </div> : 
                    <div className='header'>
                        <h1 className='header'>An email has been sent to the following raters: </h1>
                        { this.state.seeEmails ? 
                            <div>{ratersEmails}</div> : 
                            <div>{ratersList}</div> }
                    </div>
                }
                <div className='header'>
                    <div className="row">
                        <div className="col">
                            <Button color="warning" size='lg' onClick={() => this.toggleEmails()}>👀📧s</Button>
                        </div>
                        <div className="col"><Link to="/">
                            <Button color="danger" size='lg'>Edit 📃</Button></Link>
                        </div>
                        <div className="col"> 
                            { this.state.invitationsSent ? 
                                <Link to="/raterHome"><Button color= "success" size='lg'>Rate 🔥</Button></Link> :
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