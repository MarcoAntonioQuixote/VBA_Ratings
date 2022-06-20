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
        this.syncRatings = this.syncRatings.bind(this);
        this.reviewRatings = this.reviewRatings.bind(this);
        this.toggleNotes = this.toggleNotes.bind(this);
        this.raterNotes = this.raterNotes.bind(this);
        this.saveNotes = this.saveNotes.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
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

    ratingsInputted() {
        this.setState({dataToSave: true});
    }

    saveRatings(event,checkToSave) {
        if (event) {event.preventDefault();}

        if (checkToSave) {
            this.setState({
                saveModalOpen: true,
            })
        }

        const players = this.state.players;
        const skill = this.state.skill;
        const ratings = event.target; 
        let playersToSaveFor = this.state.playersToShow;
        let enteredRatings = 0;
        let submission = [];

        for (let p = 0; p < players.length; p++) {
            if (players[p][0] === playersToSaveFor[enteredRatings][0]) {
                let rating = ratings[enteredRatings].value;
                if (skill === "Serving") {players[p][1] = rating};
                if (skill === "Passing/Setting") {players[p][2] = rating};
                if (skill === "Defense") {players[p][3] = rating};
                if (skill === "Attacking") {players[p][4] = rating};
                if (skill === "Blocking") {players[p][5] = rating};
                submission.push(rating);
                enteredRatings++;
            } else {
                if (skill === "Serving") {submission.push(players[p][1])};
                if (skill === "Passing/Setting") {submission.push(players[p][2])};
                if (skill === "Defense") {submission.push(players[p][3])};
                if (skill === "Attacking") {submission.push(players[p][4])};
                if (skill === "Blocking") {submission.push(players[p][5])};
            }
        }

        for (let p = 0; p < players.length; p++) {
            switch (skill){
                case "Serving":
                    this.setState({scoresInServing: submission,});
                    break;
                case "Passing/Setting":
                    this.setState({scoresInPassSet: submission,})
                    break;
                case "Defense":
                    this.setState({scoresInDefense: submission,})
                    break;
                case "Attacking":
                    this.setState({scoresInAttacking: submission,})
                    break;   
                case "Blocking":
                    this.setState({scoresInBlocking: submission,})
                    break;              
            };
        }

        this.setState({
            dataToSave: false, 
            thisRater: {...this.state.thisRater, ratings: players}
        }, ()=> {
            axios.put(`session/${this.props.session._id}/${this.state.thisRater.email}`,this.state.thisRater);
        });

        this.props.update(players);

    }

    reviewRatings() {
        this.setState({
            saveModalOpen: true,
            requestToLeave: true,
        })
    }

    async syncRatings() {
        const res = await axios.get("/session");
        const session = res.data[res.data.length-1];
        const thisRater = this.state.thisRater;
        const lowercaseEmails = session.raters.map(rater => rater.email.toLowerCase());
        let index = lowercaseEmails.indexOf(thisRater.email.toLowerCase());
        const ratingsDataToSync = session.raters[index].ratings; //OBJECT CHECK***


        // this.props.update(session.players);

        if (ratingsDataToSync.length === 0) {
            this.setState({
                players: session.players,
            });
            return Promise;
        } 
        
        else {
            let updateServing = [];
            let updatePassSet = [];
            let updateDefense = [];
            let updateAttacking = [];
            let updateBlocking = [];
            for (let x = 0; x < ratingsDataToSync.length; x++) {
                updateServing.push(ratingsDataToSync[x][1]);
                updatePassSet.push(ratingsDataToSync[x][2]);
                updateDefense.push(ratingsDataToSync[x][3]);
                updateAttacking.push(ratingsDataToSync[x][4]);
                updateBlocking.push(ratingsDataToSync[x][5]);
            }
    
            this.setState({
                scoresInServing: updateServing,
                scoresInPassSet: updatePassSet,
                scoresInDefense: updateDefense,
                scoresInAttacking: updateAttacking,
                scoresInBlocking: updateBlocking,
                players: ratingsDataToSync,
                thisRater: {...this.state.thisRater, ratings: ratingsDataToSync}
            })
    
            this.props.update(ratingsDataToSync);
            return Promise;
        }
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
        player[7] = this.notes.value; //this value comes from form set up below, can also use event.target[0].value
        if (player[7] == "") {
            player[6] = false;
        } else player [6] = true;
        /*Not sure how it updates the state players array automatically with the player that I adopted, I thought this should work:
        this.setState({
            players: [...this.state.players, player]
        }) But actually it was this one that worked: */
        this.setState({
            players: [...this.state.players],
        }, () => {
            this.props.update(this.state.players);
        });
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
                    <Form onSubmit={(event) => {this.saveNotes(event,this.state.notesFor)}}>
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
                    {this.state.requestToLeave? 
                        <Link to="/review">
                            <Button style={{marginRight: "30px"}}color='danger'>
                            Yes</Button>
                        </Link> :
                        <Button style={{marginRight: "30px"}}color='danger' onClick={()=> {this.setState({
                            stayInSkill: false, 
                            saveModalOpen: false, 
                            dropdownOpen: true}
                            )}}>
                        Yes</Button>
                    }
                    <Button color='success' onClick={()=> {this.setState({
                        stayInSkill: true, 
                        saveModalOpen: false, 
                        dropdownOpen: false})}}> 
                    No</Button>
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
                <Form id='ratingsForm' onSubmit={(event) => {this.saveRatings(event)}}>
                    <ListPlayers 
                        players={players} 
                        onChange={this.ratingsInputted}
                        skillToShow={this.state.skill} 
                        withData={this.state.dataToPass} 
                        raterNotes={this.raterNotes}
                        oddsEvens={this.state.oddsEvens} />
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>

                        <Button className='header' color='success' size="lg" style={{marginRight: "5%"}} > Save </Button>
                    {this.state.dataToSave ? 
                        <Button color='primary' onClick={() => this.reviewRatings()} size="lg"> Review Values </Button> :
                        <Link to="/review">
                            <Button color='primary' size="lg"> Review Values </Button>
                        </Link>
                    }
                    </div>

                </Form>

                {notesModal}
                {saveModal}
            </div>
        )
    }
}

export default Rate;