import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './CalendarDay.css'

class CalendarDay extends PureComponent {
    render() {
        const {
            day,
            isOutband,
            rawReminders,
            showReminders
        } = this.props

        const overflowThreshold = 4;
        const reminders = rawReminders[btoa(day.startOf('day').toISOString())]

        const Reminders = (props) => props.items.map((reminder, i) => (
            <div className="CalendarDay__Reminder" key={i}><span className="CalendarDay__Reminder__Time">{reminder.time}</span> {reminder.text}</div>))
        const ReminderOverflow = (props) => <div className="CalendarDay__Reminder__Overflow">{props.count}!</div>

        return (
            <li onClick={() => showReminders(day)} className={`CalendarDay ${isOutband ? '' : 'CalendarDay--outband'}`}>
                <span className="CalendarDay__Number">{day.format('D')}</span>

                { console.log(reminders) }

                {typeof reminders !== 'undefined' &&
                    (reminders.length < overflowThreshold ? <Reminders items={reminders} />
                    :  <ReminderOverflow count={reminders.length}/>) }
            </li >
        )
    }
}

export default connect(
    state => ({
        rawReminders: state.calendar.reminders
    }),
    dispatch => ({
        showReminders: (day) => dispatch({ day, type: 'CALENDAR_REMINDER_SHOW' }),
    })
)(CalendarDay)