import React from 'react';
import {Link} from 'react-router-dom';

const date = new Date().toDateString("en-us");

const Header = ({logo,started,sessionDate}) => {
	return (			
		<div className="App-header">
			<Link to="/">
				<img className="logo" src={logo} alt="logo" />
			</Link>
			<p>🏐 Ratings Session 🔟</p>
			{ started ?
				<p style={{fontSize: "20px"}}>For session on {sessionDate || date}</p>	: null	
			}
		</div>
	)
}

export default Header;