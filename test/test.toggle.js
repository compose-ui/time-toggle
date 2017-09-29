var TimeToggle = require('../')
var DateToHTML = TimeToggle.dateToHTML
var assert = require('chai').assert
var domify = require('domify')
var Event = require('compose-event')

var newTimeEl = function(){ return domify('<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00"></time>') }
var modeTimeEl = function(){ return domify('<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00" data-mode="local"></time>') }
var timeagoEl = function(){ return domify('<time class="time-toggle" data-timeago="short" datetime="2016-04-21T18:51:53+00:00"></time>') }
var textTimeEl = function(){ return domify('<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00"><span class="date-text"></span><span id="icon-test">some icon</span></time>') }
var localZone = DateToHTML.timezone(new Date())

describe('DateToHTML', function(){
  it('ignores bad times', function(){
    var badTimeEl = domify('<time class="time-toggle" datetime="2016-04 21">stuff</time>')
    var parsedEl = TimeToggle.init(badTimeEl)
    assert.equal(parsedEl.innerHTML, 'stuff')
  })

  it('replaces time with timeago', function(){
    var el = TimeToggle.init(newTimeEl())

    assert.isDefined(el)
    assert.isDefined(el.querySelector('.timeago'))
  })

  it('uses data-timeago to set timeago style', function(){
    var el = TimeToggle.init(timeagoEl())
    assert.isDefined(el)
    assert.isDefined(el.querySelector('.timeago'))
  })

  it('toggles times to local templates', function(){
    var el = TimeToggle.init(newTimeEl())
    TimeToggle.toggleEl(el)

    var zone = el.querySelector('.timezone')
    assert.equal(zone.innerHTML, localZone)
  })

  it('toggles times to utc templates', function(){
    var el = TimeToggle.init(newTimeEl())
    TimeToggle.toggleEl(el)
    TimeToggle.toggleEl(el)
    var zone = el.querySelector('.timezone')
    assert.equal(zone.innerHTML, 'UTC')
  })

  it('if mode is set, it will display that mode', function(){
    var el = TimeToggle.init(modeTimeEl())
    var zone = el.querySelector('.timezone')
    assert.equal(zone.innerHTML, localZone)
  })

  it('converts time-toggles on launch', function(){
    document.body.appendChild(newTimeEl())
    Event.change.fire()
    assert.isNotNull(document.querySelector('.timeago'))
    document.body.removeChild(document.querySelector('time'))
  })

  it('toggles through time modes', function(){
    Array.prototype.forEach.call( document.querySelectorAll('time'), function(el) {
      el.parentElement.removeChild(el)
    })

    document.body.appendChild(newTimeEl())
    Event.change.fire()

    assert.equal(document.querySelector('time').dataset.mode, 'timeago')

    TimeToggle.toggle()
    assert.equal(document.querySelector('time').dataset.mode, 'local')

    TimeToggle.toggle()
    assert.equal(document.querySelector('time').dataset.mode, 'utc')

    document.body.removeChild(document.querySelector('time'))
  })

  it('preserves contents of time element whith date-text', function(){

    document.body.appendChild(textTimeEl())
    Event.change.fire()

    TimeToggle.toggle()

    assert.isNotNull(document.querySelector('#icon-test'))
  })
})
