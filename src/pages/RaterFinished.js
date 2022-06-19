import React from 'react';


function RaterFinished({finalizedRater}) {
    console.log("Finished: ", finalizedRater);

    return (
        <div className='header'>
            <h2>You're all finished!</h2> <br/>
            <h2>Thanks for rating, {finalizedRater.name}!</h2>
        </div>
    )
}

export default RaterFinished;