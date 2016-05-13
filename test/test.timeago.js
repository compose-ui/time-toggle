var Timeago = require('../').timeago
var assert = require('chai').assert

var dayMS = 86400000

var daysAgo = function(days){
  var now = new Date().getTime()
  return new Date(now - (days * dayMS))
}

var secondsAgo = function(seconds){
  var now = new Date().getTime()
  return new Date(now - (seconds * 1000))
}

describe('Timeago', function(){
  it('converts a new date to "just now"', function(){
    assert.equal('just now', Timeago.parse(new Date()))
  })

  it('converts a new date to "now" when short style is chosen', function(){
    assert.equal('now', Timeago.parse(new Date(), 'short'))
  })

  it('converts to "just now" when less than a minute ago', function(){
    assert.equal('just now', Timeago.parse(secondsAgo(50)))
  })

  it('converts minutes ago properly', function(){
    assert.equal('1 minute', Timeago.parse(secondsAgo(66)))
  })

  it('converts days ago properly', function(){
    assert.equal('5 days', Timeago.parse(daysAgo(5)))
  })

  it('converts weeks ago properly', function(){
    assert.equal('6 weeks', Timeago.parse(daysAgo(45)))
  })
})
