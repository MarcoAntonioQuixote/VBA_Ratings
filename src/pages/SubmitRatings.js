import React, {Component} from 'react';
import {Button,Table, ButtonDropdown,DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function ReviewHeader({oddsEvensDropdown,noRatingsToPost}) {
    return (
        <div>
            { noRatingsToPost ? 
                <h2>You haven't rated any player's skills yet.</h2> : <h2>Review your ratings for {oddsEvensDropdown} players!</h2>
            }
        </div>
    )
}

class SubmitRatings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
            dropdownOpen: false,
            oddsEvensSelect: "All",
        }

        this.toggle = this.toggle.bind(this);

    }

    toggle(toggle, oddsEvens) {
        if (toggle) {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            });
        }
        else {
            this.setState({
                oddsEvensSelect: oddsEvens,
            });
        }
    }

    render() {

        const players = this.state.players;
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

        const FinalDisplay = ({results}) => {

            const tableBody = results.map(player => {

                if (player[0] % 2 === 0 && this.state.oddsEvensSelect==="Odd") return;
                else if (player[0] % 2 === 1 & this.state.oddsEvensSelect==="Even") return;

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

        const oddsEvens = 
            <ButtonDropdown  color='success' isOpen={this.state.dropdownOpen} toggle={() => this.toggle(true)}>
                <DropdownToggle caret color="info" style={{marginTop: "5px"}}>
                    {this.state.oddsEvensSelect}
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
            <div className='header'>
                <div>Fuck yeah!</div>
                { players.length === 0 ? 
                    <h2>No players have been added yet! 😢</h2> : <ReviewHeader noRatingsToPost={noSkillsRated} oddsEvensDropdown={oddsEvens}/> }        
                { players.length > 0? 
                    <FinalDisplay results={players}/> : null }
                {!allSkillsRated ? 
                    <h6>Please finish rating all skills for all players.</h6> : null }
                    <div className="row">
                        <div className="col">
                            <Link to="/rate">
                                <Button style={{marginBottom: "25px"}} color="danger" size='lg'>Rate 🔥</Button>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/rate">
                                <Button style={{marginBottom: "25px"}} color="dark" size='lg'>Finalize 💯</Button>
                            </Link>
                        </div>
                    </div>            


            </div>

        )
    }

}

export default SubmitRatings;