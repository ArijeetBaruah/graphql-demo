import _ from 'lodash';

const initState = {
  AllAuthors: {
    isLoading: true,
    data: undefined,
    error: undefined,
  },
  Author: {
    isLoading: true,
    data: undefined,
    error: undefined,
  },
};

const authorReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_AUTHORS': {
      const tmpState = _.assign({}, state);
      const { payload } = action;
      tmpState.AllAuthors.isLoading = payload.isLoading;
      tmpState.AllAuthors.data = payload.data;
      tmpState.AllAuthors.error = payload.error;
      return tmpState;
    }
    case 'FETCH_AUTHOR': {
      const tmpState = _.assign({}, state);
      const { payload } = action;
      tmpState.Author.isLoading = payload.isLoading;
      tmpState.Author.data = payload.data;
      tmpState.Author.error = payload.error;
      return tmpState;
    }
    default: {
      return state;
    }
  }
};

export default authorReducer;
