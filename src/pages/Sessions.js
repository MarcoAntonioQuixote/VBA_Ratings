import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, Button} from 'reactstrap';
import {Link} from 'react-router-dom'

class Sessions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
        }
    }

    componentDidMount() {
        fetch("/sessions").then(res => {
            if(res.ok) { return res.json()} else {console.log(res.status,res.statusText)}
        })
            .then(jsonRes => {
                console.log(jsonRes);
                const sessions = jsonRes.map(session => {
                    return session;
                });
                console.log(sessions);
                this.setState({
                    sessions: jsonRes,
                })
            });
    }

    render() {
        const sessions = this.state.sessions.map(session => {
            return (    
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
            )
        })

        return (
            <div className='header'> 
                { this.state.sessions.length === 0 ?
                <>
                    <h2>You haven't conducted any sessions!</h2> 
                    <Link to="/"><Button size="lg" color="danger">Go Back</Button></Link>
                </> :
                <>
                    <h2>Your previous sessions:</h2>
                    {sessions}    
                </>
                }
            </div>
        )
    }
}

export default Sessions;
