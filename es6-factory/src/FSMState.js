const FSMState = (id = '') => {
  let _stateID = id;

  let self = {

    get stateID() {
      return _stateID;
    },

    canChangeTo: (state) => {
      return true;
    },
    willChangeTo: (state) => {

    },
    changedFrom: (state) => {

    },
    update: (delta) => {

    },
    destroy: () => {

    }

  };
  return self;
};
