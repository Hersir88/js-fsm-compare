/**
 * Finite-state machine
 * @param {object} states
 * @class FSM
 * @constructor
 */
export default class FSM {

  constructor(states) {
    this._states = states || {};
    this._currentState = null;
  }

  /**
   * Current state of fsm
   * @return {[FSMState | null]} current state of state machine
   */
  get currentState() {
    return this._currentState;
  }

  /**
   * Adds state to fsm
   * @param  {FSMState} state
   * @method addState
   */
  addState(state) {
    if(!state) {
      return;
    }

    if (!this._states) {
      this._states = {};
    }

    if (this._states[state.stateID]) {
      this._states[state.stateID].destroy();
    }

    this._states[state.stateID] = state;
  }

  /**
   * Changes current state
   * If can change then return's true , otherwise false
   * @param  {string} state
   * @method changeTo
   * @return {boolean} success
   */
  changeTo(state) {
    if(!this._hasState(state)) {
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
  }

  /**
   * Check if state exists
   * @method _hasState
   * @protected
   * @param  {string} state
   * @return {boolean}
   */
  _hasState(state) {
    if (this._states && this._states[state]) {
      return true;
    }
    return false;
  }

  /**
   * Get state by id
   * @method _getState
   * @protected
   * @param  {string} state's identifier
   * @return {FSMState | null} state
   */
  _getState(state) {
    if (this._hasState(state)) {
      return this._states[state];
    }
    return null;
  }

  /**
   * Checks if can transit to state
   * @method canChangeTo
   * @param  {string} state
   * @return {boolean}
   */
  canChangeTo(state) {
    if (this._hasState(state) && !this._currentState || (this._currentState && this._currentState.canChangeTo(state))) {
      return true;
    }

    return false;
  }

  /**
   * Update function that is called on frame update
   * @method update
   * @param  {number} delta time between calls
   */
  update(delta) {
    if(this._currentState) {
      this._currentState.update(delta);
    }
  }

  /**
   * Clean fsm for garbage collector
   * @method destroy
   */
  destroy() {
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
  }
}
