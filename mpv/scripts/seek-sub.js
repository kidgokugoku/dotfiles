var state = {
  initial_speed: -1,
  target: -1,
  observing: false,
  speeding: false,
}

function check_stop() {
  if (mp.get_property_native('time-pos') > state.target - 0.3) {
    mp.set_property('speed', state.initial_speed)
    state.observing = false
    mp.set_property_native('user-data/sub-transition-enabled', false)
    mp.unobserve_property(check_stop)
  }
}
function file_load() {
  state.initial_speed = -1
  state.target = -1
  state.observing = false
  mp.unobserve_property(check_stop)
}
function seek(direction) {
  if (direction < 0 && state.observing) {
    mp.set_property('speed', state.initial_speed)
    state.observing = false
    mp.unobserve_property(check_stop)
    return
  }
  if (state.observing) {
    mp.commandv('seek', direction, 'exact')
    return
  }
  var initial_sub_delay = mp.get_property_number('sub-delay', 0)
  mp.set_property_bool('sub-visibility', false)
  mp.commandv('no-osd', 'sub-step', direction / Math.abs(direction))
  var next_sub_delay = mp.get_property_number('sub-delay', 0)
  mp.set_property_number('sub-delay', initial_sub_delay)
  mp.set_property_bool('sub-visibility', true)

  var delay = initial_sub_delay - next_sub_delay
  if (delay === 0) {
    mp.commandv('seek', direction, 'exact')
    return
  }

  var skip_to = mp.get_property_number('time-pos', 0) + delay + 0.1

  if (mp.get_property_bool('pause', false) || (direction != 1 && delay < 3))
    mp.commandv('seek', skip_to, 'absolute')
  else if (delay != 0) {
    state.observing = true
    mp.set_property_native('user-data/sub-transition-enabled', true)
    state.initial_speed = mp.get_property_native('speed')
    state.target = skip_to - 2
    mp.observe_property('time-pos', 'number', check_stop)
    mp.set_property('speed', Math.max(5, state.initial_speed * 2))
  }
}

function seek_forward() {
  seek(1)
}
function seek_forward_no_speed_up() {
  seek(2)
}
function seek_backward() {
  seek(-1)
}

; (function () {
  mp.add_key_binding('j', 'seek-forward-q', seek_forward_no_speed_up)
  mp.add_key_binding('k', 'seek-backward', seek_backward)
  // mp.add_key_binding('j', 'seek-forward', seek_forward)
  mp.register_script_message('seek-forward', seek_forward_no_speed_up)
  mp.register_script_message('seek-backward', seek_backward)
  mp.register_event('file-loaded', file_load)
})()
