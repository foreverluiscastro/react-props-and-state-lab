import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilterType = event => {
    this.setState({
      filters: {
        type:  event.target.value
      }
    })
  }

  fetchListOfPets = () => {
    let url =''
    // console.log(this.state)
    if (this.state.filters.type !== "all") {
      const query = this.state.filters.type
      url = `?type=${query}`
    }
    return fetch('/api/pets' + url)
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              this.setState({
                pets: data
              })
            }) 
  }

  handleAdopt = (id) => {
    const pet = this.state.pets.find(pet => pet == id)
    // I want to change the isAdopted value to true of a specified pet based on id
    console.log(pet)
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              
              onChangeType={this.updateFilterType}
              onFindPetsClick={this.fetchListOfPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              onAdoptPet={this.handleAdopt}
              pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
