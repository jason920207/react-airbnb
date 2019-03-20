import { FETCH_RENTAL_BY_ID_INIT, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTALS_SUCCESS } from './types'

import axios from 'axios'

const fetchRentalByIdInit = () => {
  return {
    type:FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
    type:FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}

const fetchRentalSuccess = (rentals) => {
    return {
      type: FETCH_RENTALS_SUCCESS,
      rentals
    }
}

export const fetchRentals = () => {
  return function(dispatch) {
    axios.get('/api/v1/rentals')
      .then(rentals => dispatch(fetchRentalSuccess(rentals.data)))
  }
}

export const fetchRentalById = (rentalId) => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit())
    axios.get(`/api/v1/rentals/${rentalId}`)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental.data)))
  }
}
