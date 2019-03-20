import React, { Component } from 'react'
import RentalCard from './RentalCard'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class RentalList extends Component {

  renderRentals() {
    return this.props.rentals.map((rental) => {
      return (
        < RentalCard key={rental._id}
          rental={rental}/>
      )
    })
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals())
  }

  render () {
    return (
      <section id='rentalListing'>
        <h1 className='page-title'>Your Home All Around the World</h1>
        <div className='row'>
          { this.renderRentals() }
        </div>
      </section>
    )
  }
}

function mapStateToProps(state){
  return {
    rentals: state.rentals.data
  }
}

export default connect(mapStateToProps)(RentalList)
