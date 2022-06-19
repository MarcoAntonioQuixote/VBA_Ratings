import React from 'react';
import {Button,Modal, ModalHeader,ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';

function SubmitRatings({toggle,modalOpen,rater,finalDisplay,raterSubmission}) {
    return (
        <Modal isOpen={modalOpen}>
            <ModalHeader>
                {rater.name}, check out your ratings. <br/><br/>

                Do you wish to submit these ratings? 
            </ModalHeader>
            <ModalBody>
                {finalDisplay}

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