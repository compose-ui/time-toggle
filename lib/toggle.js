var Timeago = require('./timeago')
var DateToHTML = require('./date-to-html')
var Event = require('compose-event')

var Toggle = {
  timeEls: function(){
    return document.querySelectorAll('.time-toggle[datetime]')
  },

  // The key is the current time, the value is the next time type to be displayed
  nextTime: {
    'timeago': 'local',
    'local': 'utc',
    'utc': 'timeago'
  },

  // Attach listeners, setup HTML templates
  setup: function() {
    if(!Timeago.browserSupport()) return false

    Array.prototype.forEach.call(Toggle.timeEls(), Toggle.init)
  },

  // Attach listeners to toggle time zones whine clicked
  listen: function() {
    if(!Timeago.browserSupport()) return false

    Event.on(document, "click", ".time-toggle", Toggle.toggle)
  },

  // Toggle all times on page
  toggle: function(){
    Array.prototype.forEach.call(Toggle.timeEls(), function(el) {
      Toggle.toggleEl(el)
    })
  },

  // Switch between time ago, UTC, and local time
  toggleEl: function(el) {
    var date = el.getAttribute('datetime')
    var timeEl = el.querySelector('.time-toggle-date')
    var next = Toggle.nextTime[timeEl.dataset.mode]

    el.innerHTML = Toggle.dateHTML(date, next, el)

    return el
  },

  // Supply HTML for UTC and local datetime
  //
  init: function(el) {
    var datetime = el.getAttribute('datetime')
    var mode = el.dataset.mode || 'timeago'
    var html = Toggle.dateHTML(datetime, mode, el)

    if (html){ 
      el.setAttribute('title', 'toggle time')
      el.innerHTML = html
    } else {
      el.classList.remove('time-toggle')
    }

    return el
  },

  dateHTML: function(date, type, el) {
    if (type == 'timeago')
      var t = Timeago.parse(date, el.dataset.timeago)
    else if (DateToHTML[type])
      var t = DateToHTML[type](date)

    if (t) {
      return "<span class='time-toggle-date "+type+"' data-mode='"+type+"'>" + t + "</span>"
    }
  }
}

module.exports = Toggle
