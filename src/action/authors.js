import RequestService from '../util/request_service';

export default class AuthorAction {
  static fetchAuthors(dispatch) {
    const ping = `{
      authors{
        id
        name
      }
    }`;
    RequestService.fetch(ping)
      .then((response) => {
        dispatch(AuthorAction.setAuthors({ isLoading: false, data: response.data }));
      });
    return AuthorAction.setAuthors({ isLoading: true });
  }

  static fetchAuthor(dispatch, id) {
    const ping = `{
      author(id: ${id}){
        id
        name
        books{
          id
          name
        }
      }
    }`;
    RequestService.fetch(ping)
      .then((response) => {
        dispatch(AuthorAction.setAuthor({ isLoading: false, data: response.data }));
      });
    return AuthorAction.setAuthor({ isLoading: true });
  }

  static setAuthor({ isLoading, data, error }) {
    return {
      type: 'FETCH_AUTHOR',
      payload: {
        isLoading,
        data,
        error,
      },
    };
  }

  static setAuthors({ isLoading, data, error }) {
    return {
      type: 'FETCH_AUTHORS',
      payload: {
        isLoading,
        data,
        error,
      },
    };
  }
}
