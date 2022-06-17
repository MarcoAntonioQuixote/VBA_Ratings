import React, { Component } from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import Header from './Header';
import Players from "./Players";
import Rate from './Rate';
import RaterHome from './RaterHome';
import AdminHome from './AdminHome';
import Raters from './Raters';
import InviteRaters from './InviteRaters';
import CurrentSession from './CurrentSession';
import logo from '../images/vbaLogo.png';
import '../styles.css';
import ReviewRatings from './ReviewRatings';
import SubmitRatings from './SubmitRatings'

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
			startedSession: false, //should be false
			oddsEvens: "All", //*** changes in Rater Mode
			thisRater: [],
			session: [],
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
		},() => ("The state of the main app: ", this.state));
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

	startSession = (restart) => {
		if (restart) {
			this.setState({
				startedSession: false
			})
		} else {
			this.setState({
				startedSession: true
			})
		}
	}

	componentDidMount() {
		this.orderPlayers();
	}

	render () {

		const players = this.state.players;
		const raters = this.state.raters;
		const started = this.state.startedSession;
		const thisRater = this.state.thisRater;

		const updatePlayers = (players) => {
			this.setState({
				players: players,
			},()=>this.orderPlayers());
		}

		const verifyRater = (rater) => {
			this.setState({
				thisRater: rater,
			},()=>console.log(" from main ", this.state));
		}

		const loadSession = (session) => {
			console.log("loaded session: ", session);
			this.setState({
				players: session.players,
				raters: session.raters,
				startedSession: true,
				loadedSession: true,
				session: session,
			},() => console.log(this.state))
		}

		const updateRatings = (savedRatings,skill) => {

			for (let p = 0; p < players.length; p++) {
				switch (skill){
					case "Serving":
						if (savedRatings[1][p] === null) break;
						players[p][1] = savedRatings[1][p];
						break;
					case "Passing/Setting":
						if (savedRatings[2][p] === null) break;
						players[p][2] = savedRatings[2][p];
						break;
					case "Defense":
						if (savedRatings[3][p] === null) break;
						players[p][3] = savedRatings[3][p];
						break;
					case "Attacking":
						if (savedRatings[4][p] === null) break;
						players[p][4] = savedRatings[4][p];
						break;   
					case "Blocking":
						if (savedRatings[5][p] === null) break;
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
			<Header logo={logo} started={started} sessionDate={this.state.session.date}/>
			<Routes>
				<Route path='/' element={<AdminHome 
					players={players} 
					raters={raters} 
					thisRater={this.state.thisRater} 
					start={this.startSession} 
					started={started} 
					loaded={this.state.loadedSession}
					session={this.state.session}
					loadSession={loadSession}/>}/>
				{/* <Route path='/sessions' element={<CurrentSession 
					loadSession={loadSession}/>}/> */}
				<Route path='/raters' element={<Raters 
					raters={raters} 
					updateRaters={this.updateRaters}/>}/>
				<Route path='/inviteRaters' element ={<InviteRaters 
					players={players} 
					raters={raters} 
					session={this.state.session}/>}/>
				<Route path='/raterHome' element={<RaterHome 
					players={players} 
					update={updatePlayers} 
					verify={verifyRater} 
					thisRater={thisRater}/>}/>
				<Route path='addPlayer' element={<Players 
					players={players} 
					update={updatePlayers}/>} />
				<Route path='subPlayer' element={<Players 
					players={players} 
					update={updatePlayers} 
					fromHome={true}/>} />
				<Route path='rate' element={<Rate 
					players={players} 
					update={updatePlayers} 
					updateRatings={updateRatings} />} />
				<Route path='review' element={<ReviewRatings 
					players={this.state.players} 
					updatePlayers={updatePlayers}/>} />
				<Route path='submit' element={<SubmitRatings 
					players={this.state.players} />} />
			</Routes>
		</div>
		)
	}
}

export default App;

/*
On mobile devices: what's the equivalent of mouse over/hover?

•	Save button should notify that a message was saved for feedback!
•	Review should do the same thing as clicking toggle!


On Review page: It says please finish rating even though it was finished (all entries were done);

//The function for raters to add players *after* the fact might be super tricky

*Verify email address did not work well.

//When Rate is finished, and heads to review it should send Odds/Evens so that the display is automatically odds or evens

** Edit in review mode allows above 10; fix for constraints

** on the update page, saving while blank will remove the player's score. 

//review ratings is where you want it displayed that a new player has been added (so you would need to get!!)

AXIOS - make HTTP requests from react app
Min 20

*/