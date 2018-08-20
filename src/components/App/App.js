import React, { Component } from 'react'

import GameField from '../GameField/GameField'

import headerImage from './images/header.png'

import './App.scss'


export default class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="title">
            <img className="image" src={headerImage} alt="show-score"/>
          </div>
          <GameField />
        </div>
      </div>
    )
  }
}
