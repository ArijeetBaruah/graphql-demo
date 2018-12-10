import _ from 'lodash';

const initState = {
  AllBooks: {
    isLoading: true,
    error: undefined,
    data: undefined,
  },
  Book: {
    isLoading: true,
    error: undefined,
    data: undefined,
  },
};

const bookReducer = (state = initState, action) => {
  const tmpState = _.assign({}, state);
  switch (action.type) {
    case 'FETCH_BOOKS': {
      const { isLoading, error, data } = action.payload;
      tmpState.AllBooks.isLoading = isLoading;
      tmpState.AllBooks.error = error;
      tmpState.AllBooks.data = data;
      return tmpState;
    }
    case 'FETCH_BOOK': {
      const { isLoading, error, data } = action.payload;
      tmpState.Book.isLoading = isLoading;
      tmpState.Book.error = error;
      tmpState.Book.data = data;
      return tmpState;
    }
    default: {
      return state;
    }
  }
};

export default bookReducer;
