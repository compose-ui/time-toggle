var TimeToggle = require('./lib/toggle.js')
var Event = require('compose-event')

TimeToggle.timeago = require('./lib/timeago.js')
TimeToggle.dateToHTML = require('./lib/date-to-html.js')

Event.ready(TimeToggle.listen)
Event.change(TimeToggle.setup)

module.exports = TimeToggle
