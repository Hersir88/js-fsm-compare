const FSM = (states) => {
  let _states = states || {};
  let _currentState = null;

  let hasState = (state) => {
    if (_states && _states[state]) {
      return true;
    }
    return false;
  };

  let getState = (state) => {
    if (hasState(state)) {
      return _states[state];
    }
    return null;
  };

  let self = {

    get currentState() {
      return _currentState;
    },

    addState: (state) => {
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
    changeTo: (state) => {

      if (!hasState(state)) {
        return false;
      }

      let previousState = null;

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
    canChangeTo: (state) => {
      if (hasState(state) && !self.currentState || (self.currentState && self.currentState.canChangeTo(state))) {
        return true;
      }

      return false;
    },
    update: (delta) => {
      if (self.currentState) {
        self.currentState.update(delta);
      }
    },
    destroy: () => {
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
