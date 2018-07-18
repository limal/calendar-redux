import dotProp from 'dot-prop-immutable'

const initialState = {
    activeReminder: 0,
    deltaMonth: 0,
    reminders: {} // store each reminder under datetime ISO string (base64) so it'll work universally across years
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'CALENDAR_PREV_MONTH':
            return dotProp.set(state, 'deltaMonth', state.deltaMonth - 1)

        case 'CALENDAR_NEXT_MONTH':
            return dotProp.set(state, 'deltaMonth', state.deltaMonth + 1)

        case 'CALENDAR_REMINDER_ADD':
            // a reminder to be added
            const reminder = { text: action.text, time: action.time, color: action.color }

            // encode the reminders in base64 because the ISO string contains '.' characters that messes the dotProp's path to the right object
            if (typeof state.reminders[btoa(action.activeReminder)] !== 'undefined') {
                return dotProp.set(state, `reminders.${btoa(action.activeReminder)}`, [ ...state.reminders[btoa(action.activeReminder)], reminder])
            } else {
                return dotProp.set(state, `reminders.${btoa(action.activeReminder)}`, [ reminder ])
            }

        case 'CALENDAR_REMINDER_CLOSE':
            return dotProp.set(state, 'activeReminder', 0)

        case 'CALENDAR_REMINDER_SHOW':
            return dotProp.set(state, 'activeReminder', action.day.startOf('day').toISOString())

        default:
            return state
    }
}