package hansagames.fsm;

/**
 * Finite-state machine
 * @class FSM
 */
@:expose("hansagames.fsm.FSM")
class FSM {

  var states:Map<String,FSMState>;

  @isVar
  var currentState(default,null):FSMState = null;

  public function new(?states:Map<String,FSMState>) {
    this.states = states;
  }

  /**
   * Adds state to fsm
   * @param  {FSMState} state
   * @method addState
   */
  public function addState(state:FSMState):Void {
    if(state==null) {
      return;
    }


      if (states==null) {
        states = new Map<String,FSMState>();
      }

      if(this.states.exists(state.stateID)) {
          var oldState = states.get(state.stateID);

          if(oldState!= null) {
            oldState.destroy();
          }

      }

      this.states.set(state.stateID,state);
  }

  /**
   * Changes current state
   * If can change then return's true , otherwise false
   * @param  {string} state
   * @method changeTo
   * @return {boolean} success
   */
  public function changeTo(state:String):Bool {
    if (!this.hasState(state)) {
      return false;
    }

    var previousState:String = null;

    if (canChangeTo(state)) {

      if (currentState != null) {
        previousState = currentState.stateID;
        currentState.willChangeTo(state);
      }

      currentState = getState(state);
      currentState.changedFrom(previousState);
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
  private function hasState(state:String):Bool {

    if (states!=null && states.exists(state)) {
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
  private function getState(state:String):FSMState {
    if (hasState(state)) {
      return this.states.get(state);
    }
    return null;
  }

  /**
   * Checks if can transit to state
   * @method canChangeTo
   * @param  {string} state
   * @return {boolean}
   */
  public function canChangeTo(state:String):Bool {
    if (hasState(state) && currentState==null || (currentState!=null && currentState.canChangeTo(state))) {
      return true;
    }

    return false;
  }

  /**
   * Update function that is called on frame update
   * @method update
   * @param  {number} delta time between calls
   */
  public function update(delta:Float) {
    if(currentState != null) {
      currentState.update(delta);
    }
  }

  /**
   * Clean fsm for garbage collector
   * @method destroy
   */
  public function destroy() {
    currentState = null;


    if(states != null) {

      var keys = states.keys();
      var state;

      for (key in keys) {
          state = states.get(key);
          if(state != null)
            state.destroy();
          states.remove(key);
      }

      states = null;
    }
  }

}
