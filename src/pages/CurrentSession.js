import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, Button} from 'reactstrap';
import {Link} from 'react-router-dom'

class CurrentSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            session: this.props.session[this.props.session.length-1],
        }
    }

    componentDidMount() {
        fetch("/session").then(res => {
            if(res.ok) { return res.json()} else {console.log(res.status,res.statusText)}
        })
            .then(jsonRes => {
                const session = jsonRes.map(session => {
                    return session;
                });
                this.setState({
                    session: jsonRes[jsonRes.length-1],
                })
            });
    }

    render() {
        const session = this.state.session;
        let sessionDisplay;
        if (session !== undefined) {
            sessionDisplay = 
                <Card key={session._id} className='card' body color={session.color} inverse >
                    <CardHeader>Session from: <h2>{session.date}</h2></CardHeader>
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
