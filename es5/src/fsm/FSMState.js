this.hansagames_fsm = this.hansagames_fsm || {};
(function() {
  'use strict';

  /**
   * Base class for all states of FSM
   * @param {string} id state's id
   * @class FSMState
   * @constructor
   */
  function FSMState(id) {
    this.stateID = id || '';
  }

  FSMState.prototype.constructor = FSMState;


  /**
   * Function that detarmines if state can transit to next state
   * @method canChangeTo
   * @param  {string} state
   * @return {boolean}
   */
  FSMState.prototype.canChangeTo = function(state) {
    return true;
  };

  /**
   * Function called before state will transit to next state
   * @method willChangeTo
   * @param  {string} state next state
   */
  FSMState.prototype.willChangeTo = function(state) {

  };

  /**
   * Function called after state is changed
   * @method changedFrom
   * @param  {string} state previous state
   */
  FSMState.prototype.changedFrom = function(state) {

  };

  /**
   * Update function that is called on from state machine for frame updates
   * @method update
   * @param  {number} delta time between calls
   */
  FSMState.prototype.update = function(delta) {

  };

  /**
   * Clean state for garbage collector
   * @method destroy
   */
  FSMState.prototype.destroy = function() {

  };

  hansagames_fsm.FSMState = FSMState;
}());
