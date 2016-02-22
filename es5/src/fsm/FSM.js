this.hansagames_fsm = this.hansagames_fsm || {};
(function() {
  'use strict';

  /**
   * Finite-state machine
   * @param {object} states
   * @class FSM
   * @constructor
   */
  function FSM(states) {
    this._states = states || null;
    this._currentState = null;
  }

  FSM.prototype.constructor = FSM;


  /**
   * Current state of fsm
   * @return {[FSMState | null]} current state of state machine
   */
  Object.defineProperty(FSM.prototype, "currentState", {
    get: function() {
      return this._currentState;
    }
  });

  /**
   * Adds state to fsm
   * @param  {FSMState} state
   * @method addState
   */
  FSM.prototype.addState = function(state) {
    if (!state) {
      return;
    }

    if (!this._states) {
      this._states = {};
    }

    if (this._states[state.stateID]) {
      this._states[state.stateID].destroy();
    }

    this._states[state.stateID] = state;
  };

  /**
   * Changes current state
   * If can change then return's true , otherwise false
   * @param  {string} state
   * @method changeTo
   * @return {boolean} success
   */
  FSM.prototype.changeTo = function(state) {

    if (!this._hasState(state)) {
      return false;
    }

    var previousState = null;

    if (this.canChangeTo(state)) {

      if (this.currentState) {
        previousState = this._currentState.stateID;
        this.currentState.willChangeTo(state);
      }

      this._currentState = this._getState(state);
      this._currentState.changedFrom(previousState);
    }

    return false;
  };

  /**
   * Check if state exists
   * @method _hasState
   * @protected
   * @param  {string} state
   * @return {boolean}
   */
  FSM.prototype._hasState = function(state) {
    if (this._states && this._states[state]) {
      return true;
    }
    return false;
  };

  /**
   * Get state by id
   * @method _getState
   * @protected
   * @param  {string} state's identifier
   * @return {FSMState | null} state
   */
  FSM.prototype._getState = function(state) {
    if (this._hasState(state)) {
      return this._states[state];
    }
    return null;
  };

  /**
   * Checks if can transit to state
   * @method canChangeTo
   * @param  {string} state
   * @return {boolean}
   */
  FSM.prototype.canChangeTo = function(state) {
    if (this._hasState(state) && !this._currentState || (this._currentState && this._currentState.canChangeTo(state))) {
      return true;
    }

    return false;
  };

  /**
   * Update function that is called on frame update
   * @method update
   * @param  {number} delta time between calls
   */
  FSM.prototype.update = function(delta) {
      if(this._currentState) {
        this._currentState.update(delta);
      }
  };

  /**
   * Clean fsm for garbage collector
   * @method destroy
   */
  FSM.prototype.destroy = function() {
      this._currentState = null;

      if(this._states) {
        for (var state in this._states) {
          if (this._states.hasOwnProperty(state)) {
              this._states[state].destroy();
              this._states[state] = null;
          }
        }
        this._states = null;
      }

  };

  hansagames_fsm.FSM = FSM;
}());
