package hansagames.fsm;

/**
 * Base class for all states of FSM
 * @param {string} id state's id
 * @class FSMState
 */
@:expose("hansagames.fsm.FSMState")
 class FSMState {

   public var stateID:String = '';

   public function new (?id:String) {
       stateID = id;
   }

   /**
    * Function that detarmines if state can transit to next state
    * @method canChangeTo
    * @param  {string} state
    * @return {boolean}
    */
   public function canChangeTo(state:String):Bool {
     return true;
   }

   /**
    * Function called before state will transit to next state
    * @method willChangeTo
    * @param  {string} state next state
    */
   public function willChangeTo(state:String):Void {

   }

   /**
    * Function called after state is changed
    * @method changedFrom
    * @param  {string} state previous state
    */
   public function changedFrom(state:String):Void {

   }

   /**
    * Update function that is called on from state machine for frame updates
    * @method update
    * @param  {number} delta time between calls
    */
   public function update(delta:Float):Void {

   }

   /**
    * Clean state for garbage collector
    * @method destroy
    */
   public function destroy():Void {

   }

 }
