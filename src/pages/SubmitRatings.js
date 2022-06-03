import React from 'react';
import {Button,Table} from 'reactstrap';
import {Link} from 'react-router-dom';

function SubmitHeader({players,noRatingsToPost}) {
    return (
        <div>
            {
                noRatingsToPost ? <h2>You haven't rated any player's skills yet.</h2> : <h2>Review your ratings for {players.length} players!</h2>
            }
        </div>
    )
}

function SubmitRatings({players}) {

    const FinalDisplay = ({results}) => {

        const tableBody = results.map(player => {
            return(
                <tr key={player[0]}>
                    <th scope='row'>{player[0]}</th>
                    <td>{player[1]}</td>
                    <td>{player[2]}</td>
                    <td>{player[3]}</td>
                    <td>{player[4]}</td>
                    <td>{player[5]}</td>
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

    let allSkillsRated = true;
    let noSkillsRated = true;

    for (let y = 0; y < players.length; y++) {
        for (let z = 1; z < players[y].length; z++){
            if (!players[y][z]) {
                allSkillsRated = false;
            }
            if (players[y][z]) {
                noSkillsRated = false;
            }
        }
    }

    return (
        <div className='header'>
            {
                players.length === 0 ? <h2>No players have been added yet! 😢</h2> : <SubmitHeader players={players} noRatingsToPost={noSkillsRated}/>
            }
            

            {
                players.length > 0? <FinalDisplay results={players}/> : null
            }
            {
                !allSkillsRated ? <h6>Please finish rating all skills for all players.</h6> : null
            }            
            <Link to="/rate">
                <Button style={{marginBottom: "25px"}} color="danger" size='lg'>Rate 🔥</Button>
            </Link>
        </div>
    )
}

export default SubmitRatings;