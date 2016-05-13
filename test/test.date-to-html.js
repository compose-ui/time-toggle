var DateToHTML = require('../').dateToHTML
var assert = require('chai').assert

var localZone = DateToHTML.timezone(new Date())

var makeHTML = function(date, time, zone) {
  return '<span class="date">'+date+'</span> <span class="time">'+time+'</span> <span class="timezone">'+zone+'</span>'
}

describe('DateToHTML', function(){
  it('converts a date string to html with local timzeone', function(){
    assert.equal(makeHTML('2014-05-21', '05:50:50', localZone), DateToHTML.local('2014-05-21T05:50:50-05:00'))
  })

  it('converts a date string to html with UTC timzeone', function(){
    assert.equal(makeHTML('2014-05-21', '10:50:50', 'UTC'), DateToHTML.utc('2014-05-21T05:50:50-05:00'))
  })
})
