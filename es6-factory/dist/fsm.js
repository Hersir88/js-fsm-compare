'use strict';

var FSMState = function FSMState() {
  var id = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var _stateID = id;

  var self = {

    get stateID() {
      return _stateID;
    },

    canChangeTo: function canChangeTo(state) {
      return true;
    },
    willChangeTo: function willChangeTo(state) {},
    changedFrom: function changedFrom(state) {},
    update: function update(delta) {},
    destroy: function destroy() {}

  };
  return self;
};
"use strict";

var FSM = function FSM(states) {
  var _states = states || {};
  var _currentState = null;

  var hasState = function hasState(state) {
    if (_states && _states[state]) {
      return true;
    }
    return false;
  };

  var getState = function getState(state) {
    if (hasState(state)) {
      return _states[state];
    }
    return null;
  };

  var self = {

    get currentState() {
      return _currentState;
    },

    addState: function addState(state) {
      if (!state) {
        return;
      }

      if (!_states) {
        _states = {};
      }

      if (_states[state.stateID]) {
        _states[state.stateID].destroy();
      }

      _states[state.stateID] = state;
    },
    changeTo: function changeTo(state) {

      if (!hasState(state)) {
        return false;
      }

      var previousState = null;

      if (self.canChangeTo(state)) {

        if (self.currentState) {
          previousState = _currentState.stateID;
          self.currentState.willChangeTo(state);
        }

        _currentState = getState(state);
        _currentState.changedFrom(previousState);
      }

      return false;
    },
    canChangeTo: function canChangeTo(state) {
      if (hasState(state) && !self.currentState || self.currentState && self.currentState.canChangeTo(state)) {
        return true;
      }

      return false;
    },
    update: function update(delta) {
      if (self.currentState) {
        self.currentState.update(delta);
      }
    },
    destroy: function destroy() {
      _currentState = null;

      if (_states) {
        for (var state in _states) {
          if (_states.hasOwnProperty(state)) {
            _states[state].destroy();
            _states[state] = null;
          }
        }
        _states = null;
      }
    }

  };
  return self;
};