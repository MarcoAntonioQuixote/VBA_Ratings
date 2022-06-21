import React from 'react';


function RaterFinished({thisRater}) {

    return (
        <div className='header'>
            <h2>You're all finished!</h2> <br/>
            <h2>Thanks for rating, {thisRater.name}!</h2>
        </div>
    )
}

export default RaterFinished;