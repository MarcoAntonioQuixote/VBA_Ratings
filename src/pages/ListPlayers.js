import React from "react";
import {Input, UncontrolledTooltip} from 'reactstrap';

function ListPlayers({players,deletePlayer,skillToShow,withData,raterNotes,oddsEvens,onChange}) {

    //players = array of player #s
    //deletePlayer = parent function to delete player from parent state
    //skillToShow = skill to display
    //withData = an array of rating values to re-place into input fields for each skill

    /*Honestly, this is perhaps one of the most interesting things you've done:

        First, you were able to use map to place several elements into one element 
            /* Map through Players Array, for each player:
                * Create a DIV element that contains:
                    * Player #
                    * Input field
                    * Data in input field
    
        Second, you sorted numbers in an array easily through sort and compare function (not mine, but works!)

        Third, you, yes, YOU, passed a function (deletePlayer) so that each trash bucket deleted the player it was corresponding to. Honestly, that amazed me. Wasn't expecting it to work.

        Fourth, you also passed in an object containing different HTML elements. Insane! 🤯 (Actually, I found an easier, better method, but I'll keep this up for now so you can familiarize with it.)

    */

    let list;
    let playerRating;
    let index;

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

    if (skillToShow) {
        list = players.map(player => {
        if (oddsEvens === "Odd" && player[0]%2 === 0) {
            return;
        } else if (oddsEvens === "Even" && player[0]%2 === 1) {
            return;
        }
        if (withData) {
            index = players.indexOf(player);
            playerRating = withData[index];
        } else {
            playerRating = "";
        }
            return (
                <div className="row" key={player[0]} style={{whiteSpace: "nowrap"}}> 
                    {!player[6] ? 
                        <div className="col" onClick={() => raterNotes(player)}>🗒️</div> : 
                        <div className="col" onClick={() => raterNotes(player)} id={`TooltipFor${player[0]}`}>📝
                            <UncontrolledTooltip placement="left" target={`TooltipFor${player[0]}`}>
                            {player[7]}
                            </UncontrolledTooltip>
                        </div>
                    }
                    <div className="col"><h2>{player[0]}</h2></div>
                    {skillToShow == "Serving" ? 
                        <div className={`col ${skillToShow}Input`}>
                            <Input defaultValue={playerRating} type="number" step=".01" min="0" max="10" style={{width: '100%'}} onChange={(e)=>onChange(e)} />
                        </div> : null
                    }
                    {skillToShow == "Passing/Setting" ? 
                        <div className={`col ${skillToShow}Input`}>
                            <Input defaultValue={playerRating} type="number" step=".01" min="0" max="10" style={{width: '100%'}} onChange={(e)=>onChange(e)}/>
                        </div> : null
                    }
                    {skillToShow == "Defense" ? 
                        <div className={`col ${skillToShow}Input`}>
                            <Input defaultValue={playerRating} type="number" step=".01" min="0" max="10" style={{width: '100%'}} onChange={(e)=>onChange(e)}/>
                        </div> : null
                    }
                    {skillToShow == "Attacking" ? 
                        <div className={`col ${skillToShow}Input`}>
                            <Input defaultValue={playerRating} type="number" step=".01" min="0" max="10" style={{width: '100%'}} onChange={(e)=>onChange(e)}/>
                        </div> : null
                    }
                    {skillToShow == "Blocking" ? 
                        <div className={`col ${skillToShow}Input`}>
                            <Input defaultValue={playerRating} type="number" step=".01" min="0" max="10" style={{width: '100%'}} onChange={(e)=>onChange(e)}/>
                        </div> : null
                    }
                </div>
            )
        })
    } else {
        list = players.map(player => {
            return (
                <div className="row" key={player[0]}>
                    <div className="col"><h2> {player[0]} </h2></div>
                    <div className="col" onClick={() => deletePlayer(player)}>🗑️</div>
                </div>            
            )
        });
    }

    //what does the onClick need to do?

    /*
        * Let the List know, which is maping through the players array, that instead of a trash icon, it should display an input field.
        * For now, place the onClick in Rate
    */
    
    if (players.length > 0) {
        return (
            <div className='header'>{list}</div>
        )
    } else {
        return (
            <div className='header'>No players added yet 😢</div>
        )
    }
}

export default ListPlayers;