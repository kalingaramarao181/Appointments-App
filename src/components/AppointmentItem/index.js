import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsActive} = props
  const {title, date, id, isActive} = appointmentDetails

  const isSelected = () => {
    toggleIsActive(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-row">
        <p className="heading">{title}</p>
        <button
          data-testid="star"
          onClick={isSelected}
          className="toggle-button"
          type="button"
        >
          {isActive ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
            />
          )}
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
