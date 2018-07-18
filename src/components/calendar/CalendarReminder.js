import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import './CalendarReminder.css'

class CalendarReminder extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            reminderText: '',
            reminderTime: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidUpdate(props) {
        if (this.props.activeReminder !== props.activeReminder) {
            this.setState({ reminderText: '' })
        }
    }

    render() {
        const {
            activeReminder,
            addReminder,
            closeReminder,
            reminders
        } = this.props

        const {
            reminderText,
            reminderTime
        } = this.state

        const allReminders = reminders[btoa(activeReminder)]

        return [
            <div onClick={closeReminder} className={`CalendarReminderBlur ${activeReminder ? '' : 'CalendarReminderBlur--hidden'}`} key="1">
            </div>,
            <div className={`CalendarReminder ${activeReminder ? '' : 'CalendarReminder--hidden'}`} key="2">
                <div className="CalendarReminder__Close" onClick={closeReminder}>Close [x]</div>
                <span className="CalendarReminder__Title">{moment(activeReminder).format('D MMMM Y')}</span>

                {typeof allReminders !== 'undefined' ?
                    allReminders.map((reminder, i) => (
                        <div className="CalendarReminder__Reminder" key={i}><span className="CalendarReminder__Reminder__Time">{reminder.time}</span>: "{reminder.text}"</div>)
                    ) : ''}

                <div className="CalendarReminder_AddForm">
                    <input placeholder="Enter your reminder..." type="text" name="reminderText" value={reminderText} onChange={this.handleChange} />
                    <input type="time" name="reminderTime" value={reminderTime} onChange={this.handleChange} />
                    <button onClick={() => addReminder(reminderText, reminderTime, activeReminder)}>ADD REMINDER</button>
                </div>
            </div>
        ]
    }
}

export default connect(
    state => ({
        activeReminder: state.calendar.activeReminder,
        deltaMonth: state.calendar.deltaMonth,
        reminders: state.calendar.reminders
    }),
    dispatch => ({
        addReminder: (reminderText, reminderTime, activeReminder) => {
            dispatch({ text: reminderText, time: reminderTime, activeReminder, color: 0, type: 'CALENDAR_REMINDER_ADD' })
        },
        closeReminder: () => dispatch({ type: 'CALENDAR_REMINDER_CLOSE' })
    })
)(CalendarReminder)