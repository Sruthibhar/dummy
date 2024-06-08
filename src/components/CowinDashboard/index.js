// Write your code here
import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationCoverage: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const last7DaysVaccination = data.last_7_days_vaccination.map(each => ({
      vaccineDate: each.vaccine_date,
      dose1: each.dose_1,
      dose2: each.dose_2,
    }))
    const vaccinationByAge = data.vaccination_by_age.map(each => ({
      age: each.age,
      count: each.count,
    }))
    const vaccinationByGender = data.vaccination_by_gender.map(each => ({
      count: each.count,
      gender: each.gender,
    }))
    this.setState({
      vaccinationCoverage: last7DaysVaccination,
      vaccinationByAge: vaccinationByAge,
      vaccinationByGender: vaccinationByGender,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderSuccessView = () => {
    const {vaccinationCoverage, vaccinationByAge, vaccinationByGender} =
      this.state
    return (
      <div>
        <ul>
          <VaccinationCoverage data={vaccinationCoverage} />
        </ul>
        <ul>
          <VaccinationByGender data={vaccinationByGender} />
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          <img src="" />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {this.renderSuccessView()}
      </div>
    )
  }
}

export default CowinDashboard
