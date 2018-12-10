import RequestService from '../util/request_service';

export default class BookAction {
  static fetchBooks(dispatch) {
    const ping = `{
      books{
        id
        name
        author{
          name
          books{
            id
            name
          }
        }
      }
    }`;
    RequestService.fetch(ping)
      .then((response) => {
        dispatch(BookAction.setBooks({ isLoading: false, data: response.data }));
      });
    return BookAction.setBooks({ isLoading: true });
  }

  static fetchBook(dispatch, id) {
    const ping = `{
      book(id: ${id}){
        id
        name
        author{
          name
          books{
            id
            name
          }
        }
      }
    }`;
    RequestService.fetch(ping)
      .then((response) => {
        dispatch(BookAction.setBook({ isLoading: false, data: response.data }));
      });
    return BookAction.setBook({ isLoading: true });
  }

  static setBook({ isLoading, data, error }) {
    return {
      type: 'FETCH_BOOK',
      payload: {
        isLoading,
        data,
        error,
      },
    };
  }

  static setBooks({ isLoading, data, error }) {
    return {
      type: 'FETCH_BOOKS',
      payload: {
        isLoading,
        data,
        error,
      },
    };
  }
}
