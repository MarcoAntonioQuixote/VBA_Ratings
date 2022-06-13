import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            players: props.players,
            raters: props.raters,
            startedSession: props.started,
        }
    }

    render() {

        const started = this.state.startedSession;
        const raters = this.state.raters;
        const players = this.state.players;

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
                { !started ?  
                    <div className='header'>
                        <h2>Want to start a Ratings Session, bitch?</h2>
                        <Button color="danger" size='lg' onClick={() => {
                            this.props.start(); 
                            this.setState({startedSession: true})}}
                        >Hell Yes 🔥</Button>
                    </div> :
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

                    </div>
                }
            </div>
        )
    }
}

export default AdminHome;