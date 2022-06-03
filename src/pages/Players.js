import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import NumberPad from './NumberPad';
import ListPlayers from './ListPlayers';

class Players extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            players: this.props.players,
            numPad: true,
            playerList: false,
        }
        this.showPlayerList = this.showPlayerList.bind(this);
    }

    showPlayerList() {
        this.setState({
            playerList: !this.state.playerList,
        })
    }

    componentDidMount() {
        if (this.props.fromHome) {
            this.showPlayerList();
            this.setState({
                fromHome: true,
            })
        }
    }

    render () {

        const players = this.state.players;

        const deletePlayer = (bibNum) => {
            const playersWithRemovedBibNum = this.state.players.filter((player) => {
                if (player[0] != bibNum[0]) {
                    return player;
                }
            })
            this.setState({
                players: playersWithRemovedBibNum,
            });
            this.props.update(playersWithRemovedBibNum);
        }

        const addPlayer = (bibNum) => {
            for (let b = 0; b < players.length; b++) {
                if (bibNum == players[b][0]){
                    alert("That Bib Number Already Exists 🏳️‍🌈");
                    return;
                }
            }
            if (bibNum === "") {
                alert("Please enter a Bib Number, silly! 🤪");
            } else {
                let newPlayers = [...this.state.players, [bibNum,"","","","","",false,""]]
                this.setState({
                    players: newPlayers
                });
                this.props.update(newPlayers);                    
            }
        }

        return (
            <div>
                <h2 className="header">Players: {players.length}</h2>
                {
                    this.state.playerList ? <ListPlayers players={players} deletePlayer={deletePlayer}/> : <NumberPad functionToPass={addPlayer}/>
                }
                
                <div className='header'>

                </div>
                <div className="container">
                    <div className="row">
                        <div className="col col-5 offset-1">
                            {   this.state.playerList ?
                                <Button color="success" size='lg' onClick={this.showPlayerList}> ➕/➖ Players </Button>
                                : <Link to="/subPlayer"><Button color="success" size='lg' onClick={this.showPlayerList}> Players 🙋🏽🏐</Button></Link>
                            }
                        </div>
                            {
                                (this.state.playerList && !this.state.fromHome) ?
                                <div className="col col-5">
                                    <Link to='/addPlayer'><Button color="warning" size='lg' onClick={this.showPlayerList}>Go Back ↩️</Button></Link></div> 
                                : null
                            }
                            {
                                (this.state.playerList && this.state.fromHome) ? <div className="col col-5">
                                 <Link to='/'><Button color="warning" size='lg' onClick={this.showPlayerList}>Go Back ↩️</Button></Link></div> : null
                            }
                            {
                                !this.state.playerList && !this.state.fromHome ? 
                                <div className="col col-5"><Link to="/">
                                    <Button color="danger" size='lg' onClick={() => this.props.update(players)}>Go Back ↩️</Button></Link>
                                </div> : null
                            }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Players;