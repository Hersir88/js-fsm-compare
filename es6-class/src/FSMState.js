/**
 * Base class for all states of FSM
 * @param {string} id state's id
 * @class FSMState
 */
export default class FSMState {
  constructor(id) {
    this.stateID = id || '';
  }

  /**
   * Function that detarmines if state can transit to next state
   * @method canChangeTo
   * @param  {string} state
   * @return {boolean}
   */
  canChanegTo(state) {
    return true;
  }

  /**
   * Function called before state will transit to next state
   * @method willChangeTo
   * @param  {string} state next state
   */
  willChangeTo(state) {

  }

  /**
   * Function called after state is changed
   * @method changedFrom
   * @param  {string} state previous state
   */
  changedFrom(state) {

  }

  /**
   * Update function that is called on from state machine for frame updates
   * @method update
   * @param  {number} delta time between calls
   */
  update(delta) {

  }

  /**
   * Clean state for garbage collector
   * @method destroy
   */
  destroy() {

  }
}
