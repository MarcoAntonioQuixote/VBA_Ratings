import React, {Component} from 'react';
import {Button} from 'reactstrap';

class NumberPad extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            entry: "",
            firstClick: true,
        }
        // this.BibEntry = this.BibEntry.bind(this); ?? Need?
        
    }

    BibEntry = (num,del,dec) => {
        if (del) {
            this.setState({
                entry: this.state.entry.slice(0,-1),
            });
            return;
        }
        if (dec) {
            if (this.state.entry.includes(".")) {
                return;
            }
            this.setState({
                entry: this.state.entry + ".",
            });
            return;
        }
        this.setState({
            entry: this.state.entry + num,
        });
    }

    functionForButton = (passedFunction,cancel) => {
        if (cancel) {
            passedFunction("cancel");
            return;
        }
        //This appears to be a complicated process/idea. The short concept is this:
            //The numPad will be needed on various pages (but what it does may need to change)
            //So you are striving to pass it a funciton that is used whenever one of the bottom buttons is clicked, what that button will do, however, will depend on the funciton passed here.
        passedFunction(this.state.entry);
        this.setState({
            entry: "",
        })
    }

    //******************** Can you add a long press to turn the backspace into a delete option */

    render () {
        return (
            <>
                <h1 className='header' style={{marginBottom: "10%"}}> {this.state.entry} &nbsp; </h1>

                <div className='numPad'>
                    <div className="row">
                        <Button className="col" color="dark" onClick={() => this.BibEntry(1)}>1</Button>
                        <Button className="col" color="dark" onClick={() => this.BibEntry(2)}>2</Button>
                        <Button className="col" color="dark" onClick={() => this.BibEntry(3)}>3</Button>
                    </div>
                    <div className="row">
                        <Button className="col" color="dark" onClick={() => this.BibEntry(4)}>4</Button>
                        <Button className="col" color="dark" onClick={() => this.BibEntry(5)}>5</Button>
                        <Button className="col" color="dark" onClick={() => this.BibEntry(6)}>6</Button>
                    </div>
                    <div className="row">
                        <Button className="col" color="dark" onClick={() => this.BibEntry(7)}>7</Button>
                        <Button className="col" color="dark" onClick={() => this.BibEntry(8)}>8</Button>
                        <Button className="col" color="dark" onClick={() => this.BibEntry(9)}>9</Button>
                    </div>
                    { !this.props.updateRatings ?
                        <div className="row">
                            <Button className="col" color="warning" onClick={() => this.BibEntry(null,true)}>⬅️</Button>
                            <Button className="col" color="dark" onClick={() => this.BibEntry(0)}>0</Button>
                            <Button className="col" color="info" 
                            onClick={() => this.functionForButton(this.props.functionToPass)}>➕ Player</Button>
                        </div> :
                        <div className="row">
                            <Button className="col-2" color="warning" onClick={() => this.BibEntry(null,true)}>⬅️</Button>
                            <Button className="col-2" color="info" onClick={() => this.BibEntry(null,null,true)}><strong>.</strong></Button>
                            <Button className="col" color="dark" onClick={() => this.BibEntry(0)}>0</Button>
                            <Button className="col-2" color="danger" 
                            onClick={() => this.functionForButton(this.props.functionToPass,true)}>Cancel</Button>
                            <Button className="col-2" color="success" 
                            onClick={() => this.functionForButton(this.props.functionToPass)}>Save</Button>
                        </div>
                    }
                </div>
            </>
        )
    }
}
export default NumberPad;