import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import './CalendarControls.css'
import { isMoment } from 'moment';

class CalendarControls extends PureComponent {
    render() {
        const {
            deltaMonth,
            nextMonth,
            prevMonth
        } = this.props

        return (
            <div className="CalendarControls">
                <button className="CalendarControls__Button" onClick={prevMonth}>Prev</button>
                <span className="CalendarControls__MonthName">{ moment().add(deltaMonth, 'month').format('MMMM Y') }</span>
                <button className="CalendarControls__Button" onClick={nextMonth}>Next</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        deltaMonth: state.calendar.deltaMonth
    }),
    dispatch => ({
        nextMonth: () => dispatch({ type: 'CALENDAR_NEXT_MONTH' }),
        prevMonth: () => dispatch({ type: 'CALENDAR_PREV_MONTH' })
    })
)(CalendarControls)