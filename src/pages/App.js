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
import ReviewRatings from './ReviewRatings';
import RaterFinished from './RaterFinished';
import '../styles.css';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			players: [],
			raters: [],
			startedSession: false, 
			oddsEvens: "All",
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
			const raters = this.state.raters.filter(thisRater => thisRater.name !== rater.name);
			this.setState({
				raters: raters, //OBJECT CHECK COPIED FROM RATERS PAGE
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
		const session = this.state.session;

		const updatePlayers = (players) => {
			this.setState({
				players: players,
				thisRater: {...thisRater, ratings: players}
			},()=>this.orderPlayers());
		}

		const verifyRater = (rater) => {
			this.setState({
				thisRater: rater,
			});
		}

		const loadSession = (session) => {
			this.setState({
				players: session.players,
				raters: session.raters,
				startedSession: true,
				loadedSession: true,
				session: session,
			});
		}

		const oddsEvensSelect = (selection) => {
			switch(selection) {
				case "Odd": 
					this.setState({
						oddsEvens: "Odd"
					});
					break;
				case "Even": 
					this.setState({
						oddsEvens: "Even"
					});
					break;
				default:
					this.setState({
						oddsEvens: "All"
					})
			}
		}

	return (
		<div className='App'>
			<Header logo={logo} started={started} sessionDate={session.date}/>
			<Routes>
				<Route path='/' element={<AdminHome 
					players={players} 
					raters={raters} 
					thisRater={this.state.thisRater} 
					start={this.startSession} 
					started={started} 
					loaded={this.state.loadedSession}
					session={session}
					loadSession={loadSession}/>}/>
				<Route path='/raters' element={<Raters 
					raters={raters} 
					updateRaters={this.updateRaters}/>}/>
				<Route path='/inviteRaters' element ={<InviteRaters 
					players={players} 
					raters={raters} 
					session={session}/>}/>
				<Route path='/raterHome' element={<RaterHome 
					players={players} 
					update={updatePlayers} 
					verify={verifyRater}
					loadSession={loadSession}
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
					session={session}
					thisRater={thisRater} 
					oddsEvens={this.state.oddsEvens}
					oddsEvensSelect={oddsEvensSelect}/>} />
				<Route path='review' element={<ReviewRatings 
					players={this.state.players} 
					updatePlayers={updatePlayers}
					oddsEvens={this.state.oddsEvens}
					oddsEvensSelect={oddsEvensSelect}
					thisRater={thisRater} 
					session={session} />} />
				<Route path='raterFinished' element={<RaterFinished 
					thisRater={this.state.thisRater} />} />
			</Routes>
		</div>
		)
	}
}

export default App;

/*

Review ratings doesn't ask for save?

cannot match by first name either.

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

turned off logo link to home!! Fix?

** Will it work if you go between odds/evens?

AXIOS - make HTTP requests from react app
Min 20

*/