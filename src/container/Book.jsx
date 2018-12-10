import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookAction from '../action/book';

class Book extends Component {
  constructor(props) {
    super(props);
    const { id } = props;
    props.fetchBook(id);
    this.renderAuthorOtherWorks = this.renderAuthorOtherWorks.bind(this);
  }

  renderAuthorOtherWorks() {
    const { books } = this.props;
    const { book } = books.Book.data.data;
    return _.map(book.author.books, (bookEle, key) => (
      <li key={key}>
        {bookEle.name}
      </li>
    ));
  }

  render() {
    const { books } = this.props;
    if (books.Book.isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    if (books.Book.error) {
      return (
        <div>Something went wrong</div>
      );
    }

    const { book } = books.Book.data.data;
    const { goBack } = this.props;
    return (
      <div className="container">
        <a href="javascript:void(0);" onClick={() => { goBack(); }}>&lt;back</a>
        <h1>{book.name}</h1>
        <h2>Author&apos;s Other Works</h2>
        <ul>
          {this.renderAuthorOtherWorks()}
        </ul>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  books: state.books,
});

const mapDispatchToProp = dispatch => ({
  fetchBook: id => dispatch(BookAction.fetchBook(dispatch, id)),
});

Book.propTypes = {
  books: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  id: PropTypes.string.isRequired,
  fetchBook: PropTypes.func.isRequired,
  goBack: PropTypes.func,
};

Book.defaultProps = {
  goBack: () => {},
};
export default connect(mapStateToProp, mapDispatchToProp)(Book);
