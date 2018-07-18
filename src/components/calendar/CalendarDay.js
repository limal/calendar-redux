import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import './CalendarDay.css'

class CalendarDay extends PureComponent {
    render() {
        const {
            day,
            isOutband,
            reminders,
            showReminders
        } = this.props

        const allReminders = reminders[btoa(day.startOf('day').toISOString())]

        return (
            <li onClick={() => showReminders(day)} className={`CalendarDay ${isOutband ? '' : 'CalendarDay--outband'}`}>
                <span className="CalendarDay__Number">{day.format('D')}</span>

                {/* TODO: Make subcomponents for more readable code */}
                {typeof allReminders !== 'undefined' ?
                    (allReminders.length < 3 ? allReminders.map((reminder, i) => (
                        <div className="CalendarDay__Reminder" key={i}><span className="CalendarDay__Reminder__Time">{reminder.time}</span>: "{reminder.text}"</div>)
                    ) : <div className="CalendarDay__Reminder__Overflow">{allReminders.length}!</div>)
                    : '' }
            </li >
        )
    }
}

export default connect(
    state => ({
        reminders: state.calendar.reminders
    }),
    dispatch => ({
        showReminders: (day) => dispatch({ day, type: 'CALENDAR_REMINDER_SHOW' }),
    })
)(CalendarDay)