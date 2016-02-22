describe("Test FSM",function(){
  var fms;
  var playState;
  var idleState;
  var pauseState;

  beforeEach(function(){
      fsm = new hansagames_fsm.FSM();

      playState = new hansagames_fsm.FSMState('play');
      pauseState = new hansagames_fsm.FSMState('pause');
      idleState = new hansagames_fsm.FSMState('idle');

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
