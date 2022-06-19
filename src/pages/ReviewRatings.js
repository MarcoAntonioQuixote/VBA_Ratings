import React, {Component} from 'react';
import {Button,Table, ButtonDropdown,DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import NumberPad from './NumberPad';
import SubmitRatings from './SubmitRatings';

function ReviewHeader({player,skill, oddsEvensDropdown,noRatingsToPost}) {
    let instructions;
    if (player) {
        switch(skill) {
            case 1: instructions = <h2>Please update Player {player[0]}'s Serving rating.</h2>; break;
            case 2: instructions = <h2>Please update Player {player[0]}'s Pass/Set rating.</h2>; break;
            case 3: instructions = <h2>Please update Player {player[0]}'s Defense rating.</h2>; break;
            case 4: instructions = <h2>Please update Player {player[0]}'s Attacking rating.</h2>; break;
            case 5: instructions = <h2>Please update Player {player[0]}'s Blocking rating.</h2>; break;
            
        }
        return (
            <div>{instructions}</div>
        )
    }

    return (
        <div>
            { noRatingsToPost ? 
                <h2>You haven't rated any player's skills yet.</h2> : <h2>Review your ratings for {oddsEvensDropdown} players!</h2>
            }
        </div>
    )
}

class ReviewRatings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
            dropdownOpen: false,
            oddsEvens: this.props.oddsEvens,
            toggleNumPad: false,
            playerToEdit: null,
            ratingToEdit: null,
            allRequiredRatingsComplete: false,
            noRequiredRatingsComplete: true,
            showFinalRatingsModal: false,
            thisRater: this.props.thisRater,
        }

        this.toggle = this.toggle.bind(this);
        this.editRating = this.editRating.bind(this);
        this.adjustRating = this.adjustRating.bind(this);
        this.ratingsCompleteCheck = this.ratingsCompleteCheck.bind(this);
        this.RatingsSubmissionModal = this.RatingsSubmissionModal.bind(this);
    }

    toggle(toggle, oddsEvens) {
        if (toggle) {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            });
        }
        else {
            this.setState({
                oddsEvens: oddsEvens,
                thisRater: {...this.state.thisRater, oddsEvens: oddsEvens} //
            },()=> {
                this.ratingsCompleteCheck();
                this.props.oddsEvensSelect(oddsEvens);
            })
        }
    }

    editRating(player,rating) {
        if (this.state.showFinalRatingsModal) {return};
        if (this.state.toggleNumPad === true) {
            this.setState({
                toggleNumPad: false,
                playerToEdit: null,
                ratingToEdit: null,
            })
        } else {
            this.setState({
                toggleNumPad: true,
                playerToEdit: player,
                ratingToEdit: rating,
            });
        }
    }

    adjustRating (newRating) {
        const playerToEdit = this.state.playerToEdit;

        if (newRating === "cancel") {
            this.setState({
                toggleNumPad: false,
                playerToEdit: null,
                ratingToEdit: null,
            });
            return;
        }
        
        playerToEdit[this.state.ratingToEdit] = newRating;

        const updatedPlayers = this.state.players.filter(player => {
            if (!player[0] === playerToEdit[0]) {
                return player;
            } else {
                return playerToEdit;
            }
        });
        this.props.updatePlayers(updatedPlayers);
        this.setState({
            toggleNumPad: false,
        });
        setTimeout(() => {
            this.setState({
                playerToEdit: null,
                ratingToEdit: null,
            })
        },3000);
    }

    ratingsCompleteCheck() {
        let playersToRate = null;
        let ratedAll = true;

        switch(this.state.oddsEvens) {
            case "Odd":
                playersToRate = this.state.players.filter(player => 
                    player[0] % 2 === 1);
                break;
            case "Even":
                playersToRate = this.state.players.filter(player => 
                    player[0] % 2 === 0);
                break;
            default: 
                playersToRate = this.state.players;
        }

        for (let y = 0; y < playersToRate.length; y++) {
            for (let z = 1; z < playersToRate[y].length-2; z++) {
                if (!playersToRate[y][z]) {
                    ratedAll = false;
                }
                if (playersToRate[y][z]) {
                    this.setState({
                        noRequiredRatingsComplete: false
                    })
                }
            }
        }

        if (ratedAll === true) {
            this.setState({
                allRequiredRatingsComplete: true,
            })
        } else {
            this.setState({
                allRequiredRatingsComplete: false,
            })
        }

    }

    RatingsSubmissionModal() {
        if (!this.state.allRequiredRatingsComplete) {
            alert(`You have not finished entering all of your ratings for ${this.state.oddsEvens} Players. Pooey 💩`);
            return;
        }
        this.setState({
            showFinalRatingsModal: !this.state.showFinalRatingsModal,
        },() => console.log("Finalized this dot state: ", this.state));
    }

    componentDidMount() {
        this.ratingsCompleteCheck();
    }

    render() {

        const players = this.state.players;
        const playerToEdit = this.state.playerToEdit;
        let allComplete = this.state.allRequiredRatingsComplete;
        let noneComplete = this.state.noRequiredRatingsComplete;

        const FinalDisplay = ({results}) => {

            const tableBody = results.map(player => {

                let highlightRating;
                const highlightStyle = {border: "solid red 2px"};

                if (playerToEdit && player[0] === playerToEdit[0]) {
                    highlightRating = this.state.ratingToEdit;
                }

                if (player[0] % 2 === 0 && this.state.oddsEvens==="Odd") return;
                else if (player[0] % 2 === 1 & this.state.oddsEvens==="Even") return;
            
                return(
                    <tr key={player[0]}>
                        <th scope='row'>{player[0]}</th>
                        {player[1] === "" ? <td>{player[1]}</td> : null}
                        {player[1] !== "" && highlightRating === 1 ? 
                            <td style={highlightStyle} onClick={() => this.editRating(player,1)}>{player[1]}</td> : null }
                        {player[1] !== "" && highlightRating !== 1 ?
                            <td onClick={() => this.editRating(player,1)}>{player[1]}</td> : null }
                        {player[2] === "" ? <td>{player[2]}</td> : null}
                        {player[2] !== "" && highlightRating === 2 ? 
                            <td style={highlightStyle} onClick={() => this.editRating(player,2)}>{player[2]}</td> : null }
                        {player[2] !== "" && highlightRating !== 2 ?
                            <td onClick={() => this.editRating(player,2)}>{player[2]}</td> : null }
                        {player[3] === "" ? <td>{player[3]}</td> : null}
                        {player[3] !== "" && highlightRating === 3 ? 
                            <td style={highlightStyle} onClick={() => this.editRating(player,3)}>{player[3]}</td> : null }
                        {player[3] !== "" && highlightRating !== 3 ?
                            <td onClick={() => this.editRating(player,3)}>{player[3]}</td> : null }
                        {player[4] === "" ? <td>{player[4]}</td> : null}
                        {player[4] !== "" && highlightRating === 4 ? 
                            <td style={highlightStyle} onClick={() => this.editRating(player,4)}>{player[4]}</td> : null }
                        {player[4] !== "" && highlightRating !== 4 ?
                            <td onClick={() => this.editRating(player,4)}>{player[4]}</td> : null }
                        {player[5] === "" ? <td>{player[5]}</td> : null}
                        {player[5] !== "" && highlightRating === 5 ? 
                            <td style={highlightStyle} onClick={() => this.editRating(player,5)}>{player[5]}</td> : null }
                        {player[5] !== "" && highlightRating !== 5 ?
                            <td onClick={() => this.editRating(player,5)}>{player[5]}</td> : null }                        
                        
                    </tr>
                )
            })
    
            return (
                <div>
                    <Table dark>
                        <thead> 
                            <tr> 
                                <th> P# </th>
                                <th> Ser </th>
                                <th> PS </th>
                                <th> Def </th>
                                <th> Atk </th>
                                <th> Blk </th>
                            </tr> 
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                </div>            
            )
        }

        const oddsEvens = 
            <ButtonDropdown  color='success' isOpen={this.state.dropdownOpen} toggle={() => this.toggle(true)}>
                <DropdownToggle caret color="info" style={{marginTop: "5px"}}>
                    {this.state.oddsEvens}
                </DropdownToggle>
                <DropdownMenu color="info" style={{marginTop: "0px"}}>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "All")}> 
                    All </DropdownItem>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Odd")}>
                    Odd </DropdownItem>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Even")}>
                    Even </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>

        return (
            <div>

                <div className='header'>
                    { players.length === 0 ? 
                        <h2>No players have been added yet! 😢</h2> : <ReviewHeader player={playerToEdit} skill={this.state.ratingToEdit} noRatingsToPost={noneComplete} oddsEvensDropdown={oddsEvens}/> }
                </div>
                    { this.state.toggleNumPad ?
                        <NumberPad functionToPass={this.adjustRating} updateRatings={true}/> : null }        
                <div className="header">
                    { players.length > 0? 
                        <FinalDisplay results={players}/> : null }
                    {!allComplete ? 
                        <h6>Click on any entered rating to change its value. Or click Rate 🔥 to enter your ratings for {this.state.oddsEvens} players.</h6> : <h6>You have finished rating {this.state.oddsEvens} players!</h6> }
                    <div className="row">
                        <div className="col">
                            <Link to="/rate">
                                <Button style={{marginBottom: "25px"}} color="danger" size='lg'>Rate 🔥</Button>
                            </Link>
                        </div>
                        <div className="col">
                            <Button onClick={() => this.RatingsSubmissionModal()} style={{marginBottom: "25px"}} color="dark" size='lg'>Finalize 💯</Button>
                        </div>
                    </div>
                </div> 
                {this.state.showFinalRatingsModal?
                    <SubmitRatings 
                        toggle={this.RatingsSubmissionModal} 
                        modalOpen={this.state.showFinalRatingsModal} 
                        rater={this.state.thisRater}
                        // oddsEvens={this.state.oddsEvens} 
                        raterSubmission={this.props.raterSubmission}
                        finalDisplay={<FinalDisplay results={players}></FinalDisplay>}/> : null
                } 
                {/* You were able to pass FinalDisplay as a component and not just as a function by putting it in brackets and giving it props */}
            </div>

        )
    }

}

export default ReviewRatings;