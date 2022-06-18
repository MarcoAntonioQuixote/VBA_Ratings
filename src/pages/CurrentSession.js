import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, Button} from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios';

class CurrentSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            session: this.props.session[this.props.session.length-1],
        }

        this.checkForSession = this.checkForSession.bind(this);
    }

    async checkForSession() {
        let res = await axios.get("/session");
        let session = res.data[res.data.length-1];

        this.setState({
            session: session,
        })
    }

    componentDidMount() {
        this.checkForSession();
    }

    render() {
        const session = this.state.session;
        let sessionDisplay;
        if (session !== undefined) {
            sessionDisplay = 
                <Card key={session._id} className='card' body color={session.color} inverse >
                    <CardHeader>Session {session.id} from: <h2>{session.date}</h2></CardHeader>
                    <CardTitle>
                        Num of Raters: {session.raters.length} <br/>

                        Num of Players: {session.players.length}
                    </CardTitle>
                    <Link to="/">
                        <Button color="dark" onClick={() => this.props.loadSession(session)}> Select </Button>
                    </Link>
                </Card>            
        }

        return (
            <div className='header'> 
                { session === undefined ?
                <>
                    <h2>You haven't conducted any prior sessions!</h2> 
                </> :
                <>
                    <h2>Your Current Session:</h2>
                    {sessionDisplay}    
                </>
                }
            </div>
        )
    }
}

export default CurrentSession;
