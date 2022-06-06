import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button,Form,Input } from 'reactstrap';

class Raters extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            raters: this.props.raters,
            defaultName: "Rater's Name",
            defaultEmail: "Rater's Email",
        }
    }

    render () {

        const raters = this.state.raters;

        const addRater = (e) => {
            const raterName = e.target[0].value;
            const raterEmail = e.target[1].value;
            const newRater = [raterName,raterEmail];

            e.preventDefault();
            e.target.reset();
            const lowercaseRaters = this.state.raters.map(rater => rater[0].toLowerCase());
            const lowercaseEmails = this.state.raters.map(rater => rater[1].toLowerCase());

            if (raterName === "") {
                alert("Give a name to the rater you want to add, silly. 😋");
                return;
            } else if (raterEmail === "") {
                alert("Gotta send that invite somewhere. Please add an email for the rater.📨");
                return;
            } else if (lowercaseRaters.includes(raterName.toLowerCase()) || lowercaseEmails.includes(raterEmail.toLowerCase())) {
                alert("You have already entered a rater with those credentials.");
                return;
            }
            this.setState({
                raters: [...this.state.raters, newRater],
                defaultName: "Rater's Name",
                defaultEmail: "Rater's Email",
            });
            this.props.updateRaters(true,newRater);
        }

        const deleteRater = (deletingRater) => {
            const raters = this.state.raters.filter(thisRater => thisRater[0] !== deletingRater[0]);
            this.setState({
				raters: raters,
			})
            this.props.updateRaters(false, deletingRater);
        }

        return (
            <div>
                <h2 className="header">Raters: {raters.length}</h2>
                <div className="header">
                    <Form onSubmit={(event) => addRater(event)}>
                        <Input placeholder={this.state.defaultName}></Input>
                        <Input placeholder={this.state.defaultEmail}></Input>
                        <div className="row">
                            <div className="col-5 offset-1">
                                <Button color="success" size='lg' type='submit'> ➕ Rater 🙋🏽🙋🏾‍♂️🙋🏼‍♀️</Button>
                            </div>
                            <div className="col-5"><Link to="/">
                                <Button color="danger" size='lg'>Go Back ↩️</Button>
                            </Link></div>
                        </div>

                    </Form>
                </div>
                <div className="header">
                    { raters.map((rater) => {
                        return (
                            <div className="row" key={rater[0]}>
                                <div className="col">
                                    <h4>{rater[0]}</h4>
                                </div>
                                <div className="col" onClick={() => deleteRater(rater)}> 🗑️ </div>
                            </div>
                        )
                    })}
                </div>            
            </div>
        )
    }
}

export default Raters;