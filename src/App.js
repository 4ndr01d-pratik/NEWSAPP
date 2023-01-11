import './App.css';
import React, { Component } from 'react'
import NavBar from './Componenets/NavBar';
import News from './Componenets/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API ;
  state = {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress : progress})
    
  }
  render() {
    return (
        <div>
          <Router>
            <NavBar></NavBar>
            <LoadingBar color='#808080'
              progress={this.state.progress}
             />
            <Routes>
              <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general"/>}></Route>
              <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={12} country='in' category='business'/>}></Route>
              <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={12} country='in' category='entertainment'/>}></Route>
              <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={12} country='in' category='general'/>}></Route>
              <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={12} country='in' category='health'/>}></Route>
              <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={12} country='in' category='science'/>}></Route>
              <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey}key="sports" pageSize={12} country='in' category='sports'/>}></Route>
              <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={12} country='in' category='technology'/>}></Route>
              
            </Routes>
           
          </Router>  
            
        </div>
        

    )
  }
}

