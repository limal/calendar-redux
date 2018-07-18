import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './Calendar.css'
import * as moment from 'moment'
import CalendarHeader from './calendar/CalendarHeader'
import CalendarControls from './calendar/CalendarControls'
import CalendarDay from './calendar/CalendarDay'
import CalendarReminder from './calendar/CalendarReminder'

class Calendar extends PureComponent {
    constructor(props) {
        const {
            deltaMonth
        } = props

        super(props)

        this.state = {
            currentMonth: moment().add(deltaMonth, 'month'),
            weeks: []
        }
    }

    regenerateCalendar(deltaMonth) {
        let weeks = []
        let currentMonth = moment().add(deltaMonth, 'month')

        // get the first and last week of the month
        let firstWeek = currentMonth.startOf('month').week(),
            lastWeek = currentMonth.endOf('month').week()

        for (let week = firstWeek; week <= lastWeek; week++) {
            weeks.push({
                week,
                days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
            })
        }

        this.setState({
            currentMonth,
            weeks
        })
    }

    componentDidMount() {
        this.regenerateCalendar(this.props.deltaMonth);
    }

    componentDidUpdate(prevProps) {
        if (this.props.deltaMonth !== prevProps.deltaMonth) {
            this.regenerateCalendar(this.props.deltaMonth);
        }
    }

    render() {
        const {
            showReminders
        } = this.props

        return (
            <div className="Calendar">
                <div className="CalendarScreen">
                <CalendarControls />
                <CalendarHeader />
                {
                    this.state.weeks.map((week, i) => (
                        <ul className="Calendar__Week" key={i}>
                            {week.days.map((day, j) => (
                                <CalendarDay day={day} isOutband={day.isSame(this.state.currentMonth, 'month')} key={j}/>
                            ))}
                        </ul>
                    )
                    )
                }
                </div>
                <CalendarReminder />
            </div>
        )
    }
}

export default connect(
    state => ({
        deltaMonth: state.calendar.deltaMonth
    }),
    dispatch => ({
    })
)(Calendar)