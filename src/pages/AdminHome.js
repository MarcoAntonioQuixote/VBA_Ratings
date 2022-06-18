import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import CurrentSession from './CurrentSession';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            players: props.players,
            raters: props.raters,
            startedSession: props.started,
            session: props.session,
            loaded: props.loaded,
        }

        this.loadSession = this.loadSession.bind(this);
    }

    loadSession(session) {
        this.props.loadSession(session);
        this.setState({
            session: session,
            loaded: true,
        })
    }

    render() {

        const started = this.state.startedSession;
        const raters = this.state.raters;
        const players = this.state.players;
        const loaded = this.state.loaded;
        const session = this.state.session;

        const alertAdmin = () => {
            if (!raters.length && !players.length) {
                alert("You haven't added any raters or players yet. Shit. 💩");
            } else if (!raters.length) {
                alert("You haven't added any raters yet. Shit. 💩");
            } else if (!players.length) {
                alert("You haven't added any players yet. Shit. 💩");
            } 
        }

        return (
            <div>
                {!started && !loaded?
                    <div>
                        <CurrentSession session={this.props.session} loadSession={this.loadSession}/>

                        <div className='header'>
                            <h2>Want to start a new Ratings Session, bitch?</h2>
                            <Button color="primary" size='lg' onClick={() => {
                                this.props.start(); 
                                this.setState({startedSession: true})
                            }}
                            >Hell Yes 🔥</Button>
                        </div>

                    </div> : null
                }

                { started || loaded ?  
                    <div>
                        <div>
                            {raters.length ? 
                                <h2 className="header">Raters: {this.state.raters.length}</h2> : 
                                <h2 className="header">Please Add Some Raters </h2>}
                            <div className="container">
                                <div className="row">
                                    <Link className="col" to="/raters">
                                        <Button color="success" size="lg">➕/➖ Raters</Button> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            {players.length ? 
                                <h2 className="header">Players: {this.state.players.length}</h2> : 
                                <h2 className="header">No Players Have Been Added Yet </h2>}
                            <div className="container">
                                <div className="row">
                                    <Link className="col" to="/addPlayer">
                                        <Button color="info" size="lg">➕ Player</Button> 
                                    </Link>
                                    <Link className="col" to="/subPlayer">
                                        <Button color="warning" size="lg">➖ Player</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            { players.length == 0 || raters.length == 0 ?
                                <Button color="primary" size='lg' onClick={()=> alertAdmin()}> Continue 🔥</Button> :
                                <Link to="/inviteRaters">
                                    <Button color="primary" size='lg'> Continue 🔥</Button>
                                </Link>
                            }

                        </div>
                        <div className='container'>
                            {session.length === 0 ?
                                null : 
                                <Button color="danger" size="lg" onClick={()=> {
                                    this.props.start(true);
                                    this.setState({startedSession: false, loaded: false})
                                }}>👈🏾 Go Back </Button>

                            }
                        </div>

                    </div> : null
                }
            </div>
        )
    }
}

export default AdminHome;