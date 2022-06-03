import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

class RaterHome extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            players: props.players,
        }
    }

    render() {

        return (
            <div>
                <div>
                    {this.state.players.length ? <h2 className="header">Players: {this.state.players.length}</h2> : <h2 className="header">No Players Have Been Added Yet </h2>
                    }
                    
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
                <div className='header'>
                    <h2>Ready to start rating?</h2>
                    <Link to="/rate">
                        <Button color="danger" size='lg'>Rate 🔥</Button>
                    </Link>
                </div>
                <div className='header'>
                    <h2>Review your ratings</h2>
                    <Link to="/submit">
                        <Button color="success" size='lg'>Review 🏐</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default RaterHome;