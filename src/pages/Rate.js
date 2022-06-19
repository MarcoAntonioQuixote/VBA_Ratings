import React, { Component } from 'react';
import {Button, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Form, Modal, ModalHeader, ModalBody, Input, FormGroup, ButtonGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import ListPlayers from './ListPlayers';
import axios from 'axios';

class Rate extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            dropdownOpen: false,
            skill: "Skill",
            players: this.props.players,
            modalOpen: false,
            saveModalOpen: false,
            notesFor: [],
            oddsEvens: this.props.oddsEvens,
            playersToShow: this.props.players,
            dataToSave: false,
            thisRater: this.props.thisRater,
        }
        this.toggle = this.toggle.bind(this);
        this.ratingsInputted = this.ratingsInputted.bind(this);
        this.saveRatings = this.saveRatings.bind(this);
        this.submitRatings = this.submitRatings.bind(this);
        // this.reUpdateRatings = this.reUpdateRatings.bind(this);
        this.syncRatings = this.syncRatings.bind(this);
        this.toggleNotes = this.toggleNotes.bind(this);
        this.raterNotes = this.raterNotes.bind(this);
        this.saveNotes = this.saveNotes.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        console.log("Hi players: ", this.state.players);
    }

    toggle(toggle, skill) {
        if (this.state.dataToSave === false) {
            if (toggle) {
                this.setState({
                    dropdownOpen: !this.state.dropdownOpen,
                }) 
            }
            if (skill) {
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
                this.setState({
                    skill: skill,
                });
            }
        } else {
            if (this.state.stayInSkill !== false) {
                this.setState({
                    saveModalOpen: true, //ask the question
                })
            } else if (toggle) {
                this.setState({
                    dropdownOpen: !this.state.dropdownOpen,
                })
            }

            else if (skill && this.state.stayInSkill === false) {
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
                this.setState({
                    skill: skill,
                    dropdownOpen: false,
                    stayInSkill: null,
                    dataToSave: false,
                });
            }
        }
    }

    ratingsInputted(event) {
        this.setState({dataToSave: true});
    }

    saveRatings(e,saveRatingsInMain) {
        e.preventDefault();
        let submission = [];
        const players = this.state.players;
        let enteredRatings = 0;
        let playersToSaveFor = this.state.playersToShow;
        let saveToMain = new Array(6); //bib# and ratings for 5 skills
        
        for (let p = 0; p < players.length; p++) {
            if (players[p][0] === playersToSaveFor[enteredRatings][0]) {
                submission.push(e.target[enteredRatings].value);
                if (enteredRatings < playersToSaveFor.length-1) {
                    enteredRatings++;
                }
            } else { submission.push(null); }
        }

        console.log("submission: ", submission)

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
        this.setState({dataToSave: false},() => {
            console.log("state now: ", this.state);
            this.submitRatings(null,true);
        });
            
        saveRatingsInMain(saveToMain,this.state.skill);
    }

    submitRatings(updateRatings,saveToServer) {
        let organizingData = [];
        let thisRater = this.state.thisRater;
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
        });

        thisRater.ratings = organizingData;

        //OBJECT CHECK

        if (saveToServer && this.props.session._id !== undefined) {
            axios.put(`session/${this.props.session._id}/${this.state.thisRater.email}`,thisRater);

        } else if (saveToServer) {
            console.log("You have this saved in session: ", this.props.session);
        } else updateRatings(null,null,organizingData); //function passed from main app
    }

    async syncRatings() {
        const res = await axios.get("/session");
        const session = res.data[res.data.length-1];
        const thisRater = this.state.thisRater;
        const lowercaseEmails = session.raters.map(rater => rater.email.toLowerCase());
        let index = lowercaseEmails.indexOf(thisRater.email.toLowerCase());
        const dataToSync = session.raters[index].ratings; //OBJECT CHECK***
        if (!dataToSync) {
            return Promise;
        }
        let updatedPlayerData = dataToSync.map(player => {
            let playerData = [...player, false, ""];
            return playerData;
        });

        let updateServing = [];
        let updatePassSet = [];
        let updateDefense = [];
        let updateAttacking = [];
        let updateBlocking = [];
        for (let x = 0; x < updatedPlayerData.length; x++) {
            updateServing.push(updatedPlayerData[x][1]);
            updatePassSet.push(updatedPlayerData[x][2]);
            updateDefense.push(updatedPlayerData[x][3]);
            updateAttacking.push(updatedPlayerData[x][4]);
            updateBlocking.push(updatedPlayerData[x][5]);
        }
        console.log("Check it out: ", updatedPlayerData);
        this.setState({
            scoresInServing: updateServing,
            scoresInPassSet: updatePassSet,
            scoresInDefense: updateDefense,
            scoresInAttacking: updateAttacking,
            scoresInBlocking: updateBlocking,
            // players: updatedPlayerData, OBJECT CHECK
        })

        // this.props.update(updatedPlayerData);
        return Promise;
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
        let oddsPlayers = [];
        let evensPlayers = this.state.players.filter(player => {
            if (player[0]%2 == 1) {
                oddsPlayers.push(player);
            } else { return player }
        });
        switch (selected) {
            case "Odd": 
                this.setState({
                    oddsEvens: "Odd",
                    playersToShow: oddsPlayers,
                    thisRater: {... this.state.thisRater, oddsEvens: selected},
                });
                this.props.oddsEvensSelect("Odd");
                break;
            case "Even":
                this.setState({
                    oddsEvens: "Even",
                    playersToShow: evensPlayers,
                    thisRater: {... this.state.thisRater, oddsEvens: selected},
                });
                this.props.oddsEvensSelect("Even");
                break;
            case "All":
                this.setState({
                    oddsEvens: "All",
                    playersToShow: this.state.players,
                    thisRater: {... this.state.thisRater, oddsEvens: selected},
                });
                this.props.oddsEvensSelect("All");
                break;
        }
      }
   
    async componentDidMount() {
        await this.syncRatings(); 
        // this.reUpdateRatings(this.props.players);
        if (this.state.oddsEvens !== "All") {
            this.onRadioBtnClick(this.state.oddsEvens);
        }

    }   

    render() {
        const players = this.state.players;
        const playerNum = this.state.playersToShow.length;
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
        const oddsEvens = 
            <ButtonGroup style={{marginBottom: "25px"}}>
                <Button color="light" onClick={() => this.onRadioBtnClick("Odd")} active={this.state.oddsEvens === 1}>Odds</Button>
                <Button color="light" onClick={() => this.onRadioBtnClick("Even")} active={this.state.oddsEvens === 2}>Evens</Button>
                <Button color="dark" onClick={() => this.onRadioBtnClick("All")} active={this.state.oddsEvens === 3}>All</Button>
            </ButtonGroup>
        const notesModal = 
            <Modal isOpen={this.state.modalOpen}>
                <ModalHeader>Your notes on #{this.state.notesFor[0]}:</ModalHeader>
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
        const saveModal = 
            <Modal isOpen={this.state.saveModalOpen}>
                <ModalHeader>Do you wish to continue without saving? </ModalHeader>
                <ModalBody>
                    <Button style={{marginRight: "30px"}}color='danger' onClick={()=> {this.setState({
                        stayInSkill: false, 
                        saveModalOpen: false, 
                        dropdownOpen: true}
                        )}}>
                    Yes</Button>
                    <Button color='success' onClick={()=> {this.setState({
                        stayInSkill: true, 
                        saveModalOpen: false, 
                        dropdownOpen: false})}}> No</Button>
                </ModalBody>
            </Modal>   

        return (
            <div className='rateHeader'>
                <h2>Which player numbers are you rating?</h2>
                {oddsEvens} 
                { this.state.oddsEvens == "All" ?
                    <h2>Enter your ratings for All {playerNum} Players on {skills} : </h2> :
                    <h2>Enter your ratings for the {playerNum} {this.state.oddsEvens} Players on {skills}:</h2> 
                }
                <Form id='ratingsForm' onSubmit={(event) => {
                    this.saveRatings(event,this.props.updateRatings);
                    }}>
                    <ListPlayers 
                        players={players} 
                        onChange={this.ratingsInputted}
                        skillToShow={this.state.skill} 
                        withData={this.state.dataToPass} 
                        raterNotes={this.raterNotes}
                        oddsEvens={this.state.oddsEvens} />
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>

                        <Button className='header' color='success' size="lg" style={{marginRight: "5%"}} > Save </Button>
        
                        <Link to="/review"><Button color='primary' onClick={() => this.submitRatings(this.props.updateRatings)} size="lg"> Review Values </Button></Link>
                    </div>

                </Form>

                {notesModal}
                {saveModal}
            </div>
        )
    }
}

export default Rate;