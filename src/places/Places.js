import React , {useState,useEffect} from 'react'

    const Places = (props) => {

        const [weath,setweath] = useState({
            temppDes:'  °C',
            temperature: ''
       });


       useEffect (() => { 
        setweath({temperature: props.temperatureC }) 
    }, [props.temperatureC])


        return(
        <div> 
            {props.error &&   <div className='card text-center'> <p> Error : {props.error} </p> </div>  }  
            {props.time  && 
            <div className='card text-center ' >
                {props.time && <h4>{props.time}</h4> } 
                {props.weatherIconUrl && <img src={props.weatherIconUrl} alt='' className='round-img' style={{ width : '60px'}}/> } 
                <h1 className='elnumero'>  {weath.temperature}
                    <span  onClick={() => setweath({...weath,temppDes:'  °C',temperature:props.temperatureC})}>  °C</span> |
                    <span   onClick={() =>setweath({...weath,temppDes:'  °F',temperature:props.temperatureF})}>  °F</span>
                </h1> 

                {/* <h1 className='elnumero'>  {weath.temperature}

                <span className="elFelsa" onClick={() => 
                weath.temppDes === '  °C' ?
                setweath({...weath,temppDes:'  °F',temperature:props.temperatureF}) : setweath({...weath,temppDes:'  °C',temperature:props.temperatureC})
            
            
            }>{weath.temppDes}</span> 
</h1> */}



                {props.place &&    <h3>   {props.place} </h3> }
                {props.windspeed &&    <h5>   {props.windspeed} Kmp/h </h5> }
            </div>}

        </div>

      )
}

export default Places ;
