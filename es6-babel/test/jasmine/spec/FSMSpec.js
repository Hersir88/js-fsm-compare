describe("Test FSM",function(){

  var fms;
  var playState;
  var idleState;
  var pauseState;

  beforeEach(function(){

      fsm = new FSM();

      playState = new FSMState('play');
      pauseState = new FSMState('pause');
      idleState = new FSMState('idle');

      fsm.addState(idleState);
      fsm.addState(playState);
      fsm.addState(pauseState);

  });

  it('Current state should be null',function(){
        expect(fsm.currentState).toBe(null);
  });

  it('Curent state should be playState',function(){
      fsm.changeTo('play');
      expect(fsm.currentState).toEqual(playState);
  });
});
