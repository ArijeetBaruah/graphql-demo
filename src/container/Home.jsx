import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Table from 'react-bootstrap/lib/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookAction from '../action/book';

class Home extends Component {
  static handleOnClick(id) {
    window.location.hash = `/book/${id}`;
  }

  constructor(props) {
    super(props);
    props.fetchBooks();
    this.renderBooksList = this.renderBooksList.bind(this);
  }

  renderBooksList() {
    const { books } = this.props;
    const { AllBooks } = books;
    return _.map(AllBooks.data.data.books, (book, key) => (
      <tr
        key={key}
        onClick={() => Home.handleOnClick(book.id)}
        >
        <td>{key + 1}</td>
        <td>{book.name}</td>
        <td>{book.author.name}</td>
      </tr>
    ));
  }

  render() {
    const { books } = this.props;
    const { AllBooks } = books;
    const { isLoading, error } = AllBooks;
    if (isLoading) {
      return (<div>Loading...</div>);
    }
    if (error) {
      return (<div>Something went wrong</div>);
    }

    return (
      <div className="container">
        <h1>Home</h1>
        <Table
          striped
          hover
          >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBooksList()}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  books: state.books,
});

const mapDispatchToProp = dispatch => ({
  fetchBooks: () => dispatch(BookAction.fetchBooks(dispatch)),
});

Home.propTypes = {
  books: PropTypes.shape(PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape(),
    error: PropTypes.any,
  })),
  fetchBooks: PropTypes.func.isRequired,
};

Home.defaultProps = {
  books: {},
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);
