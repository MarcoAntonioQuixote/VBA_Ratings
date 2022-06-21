import React from 'react';
import {Button,Modal, ModalHeader,ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

function SubmitRatings({toggle,open,rater,display,session}) {

    console.log("FR: ", rater);
    
    const raterSubmission = (theRater) => {
        const finalizedRater = { //OBJECT CHECK LAST!!
            name: theRater.name,
            email: theRater.email,
            ratings: theRater.ratings,
            oddsEvens: theRater.oddsEvens,
            finished: true
        }

        axios.put(`session/${session._id}/${finalizedRater.email}`,finalizedRater);
    }

    return (
        <Modal isOpen={open}>
            <ModalHeader>
                {rater.name}, check out your ratings. <br/><br/>

                Do you wish to submit these ratings? 
            </ModalHeader>
            <ModalBody>
                {display}

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Button color="warning" onClick={()=> toggle()}>Return</Button>
                        </div>
                        <div className="col">
                            <Link to="/raterFinished">
                                <Button color="success" onClick={()=> raterSubmission(rater)}>Submit</Button>
                            </Link>
                        </div>
                    </div>

                </div>

            </ModalBody>

        </Modal>
    )
}

export default SubmitRatings;