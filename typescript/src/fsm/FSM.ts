/// <reference path="FSMState.ts" />
module hansagames.fsm {

  /**
   * Finite-state machine
   * @param {object} states
   * @class FSM
   * @constructor
   */
  export class FSM {

    private states: {[id:string]:FSMState};
    private _currentState: FSMState = null;

    constructor(states?: {[id:string]:FSMState}) {
      this.states = states || {};
    }

    /**
     * Current state of fsm
     * @return {[FSMState | null]} current state of state machine
     */
    get currentState(): FSMState {
      return this._currentState;
    }

    /**
     * Adds state to fsm
     * @param  {FSMState} state
     * @method addState
     */
    addState(state:FSMState) {
      if (!state) {
        return;
      }

      if (!this.states) {
        this.states = {};
      }

      if (this.states[state.stateID]) {
        this.states[state.stateID].destroy();
      }

      this.states[state.stateID] = state;
    }

    /**
     * Changes current state
     * If can change then return's true , otherwise false
     * @param  {string} state
     * @method changeTo
     * @return {boolean} success
     */
    changeTo(state:string):boolean {

      if (!this.hasState(state)) {
        return false;
      }

      var previousState = null;

      if (this.canChangeTo(state)) {

        if (this.currentState) {
          previousState = this._currentState.stateID;
          this.currentState.willChangeTo(state);
        }

        this._currentState = this.getState(state);
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
    private hasState(state):boolean {
      if (this.states && this.states[state]) {
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
    private getState(state:string):FSMState {
      if (this.hasState(state)) {
        return this.states[state];
      }
      return null;
    }

    /**
     * Checks if can transit to state
     * @method canChangeTo
     * @param  {string} state
     * @return {boolean}
     */
    canChangeTo(state:string):boolean {
      if (this.hasState(state) && !this._currentState || (this._currentState && this._currentState.canChangeTo(state))) {
        return true;
      }

      return false;
    }

    /**
     * Update function that is called on frame update
     * @method update
     * @param  {number} delta time between calls
     */
    update(delta:number) {
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

      if(this.states) {
        for (var state in this.states) {
          if (this.states.hasOwnProperty(state)) {
              this.states[state].destroy();
              this.states[state] = null;
          }
        }
        this.states = null;
      }
    }
  }
}
