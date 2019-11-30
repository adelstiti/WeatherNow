import React, { Component } from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Places from './places/Places';
import Search from './components/Search';
import {BrowserRouter} from 'react-router-dom'


class App extends Component {
  
  state = {
    temperatureC : '',
    place : '',
    temperatureF : '',
    windspeed :'',
    time : '',
    weatherIconUrl : '',
    description : '',
    urlPic : '',
    error : '',
  }

  getWeather = async (e) =>{
    e.preventDefault();
    const place = e.target.elements.place.value;
    if(place){
      const api = await fetch(`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=03f3617f4d714b3fb08123937190711&q=${place}&format=json`);
      const data = await api.json();
      if(data.data.current_condition){
      this.setState({
        temperatureC : data.data.current_condition[0].temp_C,
        temperatureF : data.data.current_condition[0].temp_F,
        windspeed : data.data.current_condition[0].windspeedKmph,
        time : data.data.current_condition[0].observation_time,
        place : data.data.request[0].query,
        description : data.data.current_condition[0].weatherDesc[0].value,
        weatherIconUrl : data.data.current_condition[0].weatherIconUrl[0].value,
        error : ''
      })
    }
    else{
      this.setState({
        temperatureC : '',
        description : '',
        place : '',
        temperatureF : '',
        windspeed :'',
        time : '',
        weatherIconUrl : '',
        urlPic : '',
        error : 'Please Enter Correct City & Country '  })
    }

      const apis = await fetch(`https://pixabay.com/api/?key=13505607-5594b8502d53f3c87ed57cc99&q=${this.state.place}`);
      const datae = await apis.json();
      if(datae.hits[0]){
        this.setState({ urlPic : datae.hits[0].largeImageURL })
          }
        else{
          const apiImage = await fetch(`https://api.unsplash.com/search/photos?page=1&client_id=1958f501736b8c2622d8838a39f09b163b7e8a5a1ccc0fde55cbce633e9c8e3e&query=${this.state.place}`);
          const Images = await apiImage.json();
          if(Images.results[0]){
            this.setState({ urlPic : Images.results[0].urls.full })
          }
          else{
          this.setState({
            temperatureC : '',
            place : '',
            temperatureF : '',
            windspeed :'',
            time : '',
            description : '',
            weatherIconUrl : '',
            urlPic : '',
            error : 'Please Enter Correct City & Country '  })
          }
        }
        
    }
    else{
          this.setState({
            temperatureC : '',
            place : '',
            temperatureF : '',
            windspeed :'',
            time : '',
            description : '',
            weatherIconUrl : '',
            urlPic : '',
            error : 'Please Enter Your City or Country'  })
        }
  }

  render() {
    return (
      <div style={ {
        background: ` url(${this.state.urlPic})  no-repeat center center  /cover `  }}
        >
        <Navbar title='Weather Now'/>
        <div className="App"  
           >

                <Search getWeather={this.getWeather} / >
                <BrowserRouter>
                <Places place={this.state.place}  
                        temperatureC={this.state.temperatureC} 
                        temperatureF={this.state.temperatureF} 
                        time={this.state.time} 
                        windspeed={this.state.windspeed} 
                        weatherIconUrl={this.state.weatherIconUrl} 
                        error={this.state.error} 
                        />
                        </BrowserRouter>
      
        </div>
        </div>
    );
  }
}

export default App;

