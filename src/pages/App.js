import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './Header';
import Players from "./Players";
import Rate from './Rate';
import RaterHome from './RaterHome';
import AdminHome from './AdminHome';
import Raters from './Raters';
import InviteRaters from './InviteRaters';
import logo from '../images/vbaLogo.png';
import '../styles.css';
import SubmitRatings from './SubmitRatings';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			players: [
				["1034","","","","","",false,""],
				["207","","","","","",false,""],
				["205","","","","","",false,""],
				["310","","","","","",false,""],
				["304","","","","","",false,""],
				["308","","","","","",false,""],
				["309","","","","","",false,""],
				["004","","","","","",false,""],
				["312","","","","","",false,""],
			],
			raters: [
				["Samuel","strive2thrivetutoring@gmail.com"],
				["Chris","mr.markgutierrez@gmail.com"],
				["Michael","pakawe4448@musezoo.com"],
			],
			startedSession: true, //should be false
		}

		this.orderPlayers = this.orderPlayers.bind(this);
		this.startSession = this.startSession.bind(this);
	}

	orderPlayers = () => {
		let players = this.state.players;
		const orderedPlayers = 
        	players.map(player => { return player[0];})
        	.sort(function(a,b) {return a - b; }); //identifies the necessary order for players;
		
		players = orderedPlayers.map(player => {
				for (let p = 0; p < players.length; p++) {
					if (players[p][0] === player) {
						return players[p]
					}
				} //reorients the players array to match that order
			})
		
		this.setState({
			players: players,
		},() => console.log("The state of the main app: ", this.state));
	}

	updateRaters = (adding,rater) => {
		if (adding) {
			this.setState({
				raters: [...this.state.raters, rater],
			})
		} else {
			const raters = this.state.raters.filter(thisRater => thisRater[0] !== rater[0]);
			this.setState({
				raters: raters,
			})
		}
	}

	startSession = () => {
		this.setState({
			startedSession: true
		})
	}

	componentDidMount() {
		this.orderPlayers();
	}

	render () {

		const players = this.state.players;
		const raters = this.state.raters;
		const started = this.state.startedSession;

		const updatePlayers = (players) => {
			this.setState({
				players: players,
			},()=>this.orderPlayers());
		}

		const updateRatings = (savedRatings,skill) => {

			for (let p = 0; p < players.length; p++) {
				switch (skill){
					case "Serving":
						players[p][1] = savedRatings[1][p];
						break;
					case "Passing/Setting":
						players[p][2] = savedRatings[2][p];
						break;
					case "Defense":
						players[p][3] = savedRatings[3][p];
						break;
					case "Attacking":
						players[p][4] = savedRatings[4][p];
						break;   
					case "Blocking":
						players[p][5] = savedRatings[5][p];
						break;              
				};
			}
			this.setState({
				players: players,
			});
		}

	return (
		<div className='App'>
			<Header logo={logo} started={started}/>
			<Routes>
				<Route path='/' element={<AdminHome players={players} raters={raters} start={this.startSession} started={started}/>}/>
				<Route path='/raters' element={<Raters raters={raters} updateRaters={this.updateRaters}/>}/>
				<Route path='/inviteRaters' element ={<InviteRaters players={players} raters={raters}/>}/>
				<Route path='/raterHome' element={<RaterHome players={players}/>}/>
				
				<Route path='addPlayer' element={<Players players={players} update={updatePlayers}/>} />
				<Route path='subPlayer' element={<Players players={players} update={updatePlayers} fromHome={true}/>} />
				<Route path='rate' element={<Rate players={players} update={updatePlayers} updateRatings={updateRatings} />} />
				<Route path='submit' element={<SubmitRatings players={this.state.players}/>} />
			</Routes>
		</div>
		)
	}
}

export default App;

/*
On mobile devices: what's the equivalent of mouse over/hover?
On rate pate: If you enter ratings, but switch the skill, it doesn't ask you if you want to save, it should
Rate: Ratings should be #s from 0-10;
Toggle Even/Odds
On Submit page: It says please finish rating even though it was finished (all entries were done);

//The function for raters to add players *after* the fact might be super tricky

*/