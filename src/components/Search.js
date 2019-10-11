import React from 'react';


const Search = (props) => {
        return(
                <div > 
                        <form onSubmit={props.getWeather} >
                        <input className='InputSearch' type='text' name='place' placeholder='Enter a Place ...'/>
                        </form>
                </div>
        )
}

export default Search;