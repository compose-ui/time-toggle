# Time Toggle

Toggle time elements between relative (1 minute), local, and UTC timestamps.

Whenever a page loads (or a `page:chage` event is fired) all `time` elements with classname `time-toggle` will display relative "time ago" timestamps.

A time stamp like this:
```
<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00"></time>
```

Will be converted to relative time:

```
<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00" title="toggle time">
  <span class="time-toggle-date timeago" data-mode="timeago">2 weeks</span>
</time>
```

When clicked (in a browser in Central US time) all time stamps on the page will display their Central US timestamp.

```
<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00" title="toggle time">
  <span class="time-toggle-date local" data-mode="local">
    <span class="date">2016-04-21</span> <span class="time">13:51:53</span> <span class="timezone">CDT</span>
  </span>
</time>
```

When clicked again all timestamps on the page will display their UTC timestamp.

```
<time class="time-toggle" datetime="2016-04-21T18:51:53+00:00" title="toggle time">
  <span class="time-toggle-date utc" data-mode="utc">
    <span class="date">2016-04-21</span> <span class="time">18:51:53</span> <span class="timezone">UTC</span>
  </span>
</time>
```

Clicking a third time will restore the relative timestamp.

## Options

You can specify which timezone mode you'd like to start with by setting the `data-mode` attribute. The options are:

- `data-mode='timeago'` - (default) Relative time.
- `data-mode='local'` - Display local time (based on browser settings).
- `data-mode='utc'` - Display as UTC time.

You can also change the relative time style.

- `data-timeago='short'` - `2d`
- `data-timeago='normal'` - `2 days` (default)
- `data-timeago='long'` - `2 days ago`

