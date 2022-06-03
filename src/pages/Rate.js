import React, { Component } from 'react';
import {Button, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Form, Modal, ModalHeader, ModalBody, Input, FormGroup, ButtonGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import ListPlayers from './ListPlayers';

class Rate extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            dropdownOpen: false,
            skill: "Skill",
            players: this.props.players,
            modalOpen: false,
            notesFor: [],
        }
        this.toggle = this.toggle.bind(this);
        this.saveRatings = this.saveRatings.bind(this);
        this.submitRatings = this.submitRatings.bind(this);
        this.reUpdateRatings = this.reUpdateRatings.bind(this);
        this.toggleNotes = this.toggleNotes.bind(this);
        this.raterNotes = this.raterNotes.bind(this);
        this.saveNotes = this.saveNotes.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    toggle(toggle, skill) {
        if (toggle) {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            });
        }
        else {
            this.setState({
                skill: skill,
            });
            switch (skill){
                case "Serving":
                    this.setState({dataToPass: this.state.scoresInServing,})
                    break;
                case "Passing/Setting":
                    this.setState({dataToPass: this.state.scoresInPassSet,})
                    break;
                case "Defense":
                    this.setState({dataToPass: this.state.scoresInDefense,})
                    break;
                case "Attacking":
                    this.setState({dataToPass: this.state.scoresInAttacking,})
                    break;   
                case "Blocking":
                    this.setState({dataToPass: this.state.scoresInBlocking,})
                    break;              
            }
        }
    }

    saveRatings(e,saveRatingsInMain) {
        let submission = [];
        let players = this.state.players;
        let saveToMain = new Array(6); //bib# and ratings for 5 skills
        for (let r = 0; r < e.target.length-1; r++) {
            submission.push(e.target[r].value); //Had to find this value in the event object questions on the minus 1, is it actually grabbing ALL of the ratings for each player
        }
        e.preventDefault();
        for (let p = 0; p < players.length; p++) {

            switch (this.state.skill){
                case "Serving":
                    this.setState({scoresInServing: submission,});
                    saveToMain[1] = submission;
                    break;
                case "Passing/Setting":
                    this.setState({scoresInPassSet: submission,})
                    saveToMain[2] = submission;
                    break;
                case "Defense":
                    this.setState({scoresInDefense: submission,})
                    saveToMain[3] = submission;
                    break;
                case "Attacking":
                    this.setState({scoresInAttacking: submission,})
                    saveToMain[4] = submission;
                    break;   
                case "Blocking":
                    this.setState({scoresInBlocking: submission,})
                    saveToMain[5] = submission;
                    break;              
            };
        }

        saveRatingsInMain(saveToMain,this.state.skill);
    }

    submitRatings(updateRatings) {
        let organizingData = [];
        const players = this.state.players;
        let serving = this.state.scoresInServing;
        let passSet = this.state.scoresInPassSet;
        let defense = this.state.scoresInDefense;
        let attacking = this.state.scoresInAttacking;
        let blocking = this.state.scoresInBlocking;

        if (!serving) {
            serving = new Array(players.length);
        }
        if (!passSet) {
            passSet = new Array(players.length);
        }
        if (!defense) {
            defense = new Array(players.length);
        }
        if (!attacking) {
            attacking = new Array(players.length);
        }
        if (!blocking) {
            blocking = new Array(players.length);
        }

        for (let x = 0; x < players.length; x++) {
            let playersIndividualRatings = [];
            playersIndividualRatings.push(players[x][0],serving[x],passSet[x],defense[x],attacking[x],blocking[x]);
            organizingData.push(playersIndividualRatings);
        }

        this.setState({
            finalPlayerResults: organizingData,
            // displayResults: displayResults,
        });
        updateRatings(null,null,organizingData); //function passed from main app
    }

    reUpdateRatings(updatedRatings) {
        if(!updatedRatings) {
            return;
        }
        let updateServing = [];
        let updatePassSet = [];
        let updateDefense = [];
        let updateAttacking = [];
        let updateBlocking = [];
        for (let x = 0; x < updatedRatings.length; x++) {
            updateServing.push(updatedRatings[x][1]);
            updatePassSet.push(updatedRatings[x][2]);
            updateDefense.push(updatedRatings[x][3]);
            updateAttacking.push(updatedRatings[x][4]);
            updateBlocking.push(updatedRatings[x][5]);
        }
        this.setState({
            scoresInServing: updateServing,
            scoresInPassSet: updatePassSet,
            scoresInDefense: updateDefense,
            scoresInAttacking: updateAttacking,
            scoresInBlocking: updateBlocking
        })
    }

    toggleNotes() {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    }

    raterNotes = (player) => {
        //receive entire player array
        //change false to true
        //update state with players
        if (player[7] == "") {
            player[6] = false;
        } else player [6] = true;
        this.setState({
            notesFor: player,
            players: [...this.state.players],
        });
        this.toggleNotes();
    }
    
    saveNotes(event,player) {
        event.preventDefault();
        this.toggleNotes();
        player[7] = this.notes.value;
        if (player[7] == "") {
            player[6] = false;
        } else player [6] = true;
        /*Not sure how it updates the state players array automatically with the player that I adopted, I thought this should work:
        this.setState({
            players: [...this.state.players, player]
        }) But actually it was this one that worked: */
        this.setState({
            players: [...this.state.players],
        }, () => this.props.update(this.state.players));
    }

    onRadioBtnClick(selected) {
        console.log(selected);
        this.setState({oddsEvens: selected});
      }
   
    componentDidMount() {
        this.reUpdateRatings(this.props.players);
    }   

    render() {
        const players = this.state.players;
        const skills = 
            <ButtonDropdown  color='success' isOpen={this.state.dropdownOpen} toggle={() => this.toggle(true)}>
                <DropdownToggle caret color="info" style={{marginTop: "5px"}}>
                    {this.state.skill}
                </DropdownToggle>
                <DropdownMenu color="info" style={{marginTop: "0px"}}>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Serving")}> 
                    Serving </DropdownItem>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Passing/Setting")}>
                    Passing/Setting </DropdownItem>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Defense")}>
                    Defense </DropdownItem>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Attacking")}>
                    Attacking </DropdownItem>
                    <DropdownItem style={{marginTop: "0px"}} onClick={() => this.toggle(null, "Blocking")}>
                    Blocking </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        const modal = 
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Your notes on #{this.state.notesFor[0]}:</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(event) => this.saveNotes(event,this.state.notesFor)}>
                            <FormGroup>
                                <Input type="textarea" rows={3}
                                    defaultValue={this.state.notesFor[7]}
                                    innerRef={input => this.notes = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Save</Button>
                            {' '}
                            <Button onClick={() => this.toggleNotes()}> Cancel </Button>
                        </Form>
                    </ModalBody>
                </Modal>
                
        return (
            <div className='rateHeader'>
                <h2>Ready to start rating {players.length} players on {skills} ?</h2> 
                <Form id='ratingsForm' onSubmit={(event) => this.saveRatings(event,this.props.updateRatings)}>
                    <ListPlayers 
                        players={players} 
                        skillToShow={this.state.skill} 
                        withData={this.state.dataToPass} 
                        raterNotes={this.raterNotes}/>
                    <Button className='header' color='success'> Save </Button>
                </Form>

                <Link to="/submit"><Button color='light' onClick={() => this.submitRatings(this.props.updateRatings)}> Review Values </Button></Link>
                {modal}
                <div>
                    <ButtonGroup>
                        <Button outline color="light" onClick={() => this.onRadioBtnClick(1)} active={this.state.oddsEvens === 1}>Odds</Button>
                        <Button outline color="light" onClick={() => this.onRadioBtnClick(2)} active={this.state.oddsEvens === 2}>Evens</Button>
                        <Button outline color="danger" onClick={() => this.onRadioBtnClick(3)} active={this.state.oddsEvens === 3}>All</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

export default Rate;