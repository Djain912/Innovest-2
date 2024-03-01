import React  from 'react';
import '../Css/Error.css'
import errorimg from "../Images/404.svg"
function Error(){
    return(
        <div className='error'>
            <img src={errorimg} alt='error' className='errorimg'/>
            <h1>Error</h1>
            <p>Page Not Found</p>
            </div>
    )
}

export default Error