import React, { PureComponent } from 'react'
import * as moment from 'moment'
import './CalendarHeader.css'

class CalendarHeader extends PureComponent {
    constructor() {
        super()

        this.weekdays = moment.weekdays()
    }

    render() {
        return (
            <div className="CalendarHeader">
                { this.weekdays.map((day,i) => (
                    <li className="CalendarHeader__Weekday" key={i}>{day}</li>
                )) }
            </div>
        )
    }
}

export default CalendarHeader