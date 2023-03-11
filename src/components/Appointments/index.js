import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

const instantAppointmentList = []

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: instantAppointmentList,
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isActive: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
      inputDate: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const formateDate = format(
      new Date(event.target.value),
      'dd MMMM yyyy, EEEE',
    )
    this.setState({date: formateDate, inputDate: event.target.value})
  }

  toggleIsActive = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isActive: !eachAppointment.isActive}
        }
        return eachAppointment
      }),
    }))
  }

  selectedAppointments = () => {
    const {appointmentList} = this.state
    const filteredAppointmentList = appointmentList.filter(
      eachAppointment => eachAppointment.isActive === true,
    )
    this.setState({appointmentList: filteredAppointmentList})
  }

  render() {
    const {appointmentList, title, date, inputDate} = this.state
    console.log(date)
    return (
      <div className="container">
        <div className="card">
          <h1 className="heading">Add Appointment</h1>
          <div className="top-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <label className="label" htmlFor="Title">
                TITLE
              </label>
              <input
                id="Title"
                onChange={this.onChangeTitle}
                className="input"
                type="text"
                value={title}
                placeholder="Title"
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                id="date"
                onChange={this.onChangeDate}
                className="input"
                type="date"
                value={inputDate}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr />
          <div className="ap-container">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              onClick={this.selectedAppointments}
              className="started-button"
              type="submit"
            >
              Starred
            </button>
          </div>
          <ul className="item-container">
            {appointmentList.map(eachAppointment => (
              <AppointmentItem
                toggleIsActive={this.toggleIsActive}
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
