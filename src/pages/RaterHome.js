import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Input} from 'reactstrap';
import axios from 'axios';
import RaterFinished from './RaterFinished';

class RaterHome extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            players: this.props.players,
            raters: this.props.raters,
            thisRater: this.props.thisRater,
        }

        this.verifyRater = this.verifyRater.bind(this);
        this.syncSession = this.syncSession.bind(this);
    }

    verifyRater(event) {
        event.preventDefault();
        const email = event.target[0].value;
        const lowercaseEmails = this.state.raters.map(rater => rater.email.toLowerCase());

        if (lowercaseEmails.includes(email.toLowerCase())) {
            let raterIndex = lowercaseEmails.indexOf(email.toLowerCase());
            this.setState({
                thisRater: this.state.raters[raterIndex],
                raterIdentified: true,
            });
            
            // this.props.update(this.state.players);
            // this.props.update(this.state.players);
            this.props.verify(this.state.raters[raterIndex]);
            if (this.state.raters[raterIndex].finished) {
                this.setState({
                    alreadyFinished: true,
                })
            }
        } else {
            this.setState({
                invalidRaterEmail: true
            })
        }
    }

    async syncSession() {
        let res = await axios.get("/session");
        let session = res.data[res.data.length-1];

        this.props.loadSession(session);
        this.props.update(session.players);

        this.setState({
            raters: session.raters,
            players: session.players,
        })
    }
    
    componentDidMount() {
        this.syncSession();
    }
            
    render() {
        const players = this.state.players;
        const thisRater = this.state.thisRater;

        const ConfirmRater = () => {
            return (
                <div className='header'>
                    <Form onSubmit={(event) => this.verifyRater(event)}>
                        <Input bsSize="lg" type="email" placeholder="Verify your email address"></Input>                
                        <Button type="submit" color="primary">Join Rating Session</Button>
                    </Form>
                </div>
            )
        }

        const Invalid = () => {
            return (
                <div className='header'>
                    {this.state.invalidRaterEmail ?
                        <h4 style={{color: "cyan"}}>Enter a valid email address to rate at today's session.</h4> : null
                    }
                </div>
            )
        }

        return (
            <div>
                { this.state.alreadyFinished ?
                    <RaterFinished finalizedRater={thisRater}/> : 
                    
                    <div>
                        {this.state.thisRater.length === 0 ?
                            <div className='header'>
                                <ConfirmRater/>
                                <Invalid/>
                            </div> : 
                        <div>
                        
                        <div>
                            <h2 className='header'>Welcome, {thisRater.name}!</h2>
                            {players.length ? <h2 className="header">Players: {players.length}</h2> : <h2 className="header">No Players Have Been Added Yet </h2>
                            }
                            
                        </div>
                        <div className='header'>
                            <h2>Ready to start rating?</h2>
                            <Link to="/rate">
                                <Button color="danger" size='lg'>Rate 🔥</Button>
                            </Link>
                        </div>
                        <div className='header'>
                            <h2>Review your ratings</h2>
                            <Link to="/review">
                                <Button color="success" size='lg'>Review 🏐</Button>
                            </Link>
                        </div>

                        </div>}
                    </div>

                }
                
            </div>
        )
    }
}

export default RaterHome;