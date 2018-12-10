import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Table from 'react-bootstrap/lib/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorAction from '../action/authors';

class Authors extends Component {
  static handleOnClick(id) {
    window.location.hash = `/author/${id}`;
  }

  constructor(props) {
    super(props);
    props.fetchAuthors();
    this.renderBooksList = this.renderBooksList.bind(this);
  }

  renderBooksList() {
    const { authors } = this.props;
    return _.map(authors.AllAuthors.data.data.authors, (book, key) => (
      <tr
        key={key}
        onClick={() => Authors.handleOnClick(book.id)}
        >
        <td>{key + 1}</td>
        <td>{book.name}</td>
      </tr>
    ));
  }

  render() {
    const { authors } = this.props;
    const { isLoading, error } = authors.AllAuthors;
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
  authors: state.authors,
});

const mapDispatchToProp = dispatch => ({
  fetchAuthors: () => dispatch(AuthorAction.fetchAuthors(dispatch)),
});

Authors.propTypes = {
  authors: PropTypes.shape({
    AllAuthors: PropTypes.shape({
      isLoading: PropTypes.bool,
      data: PropTypes.shape(),
      error: PropTypes.any,
    }),
  }),
  fetchAuthors: PropTypes.func.isRequired,
};

Authors.defaultProps = {
  authors: {
    AllAuthors: {
      isLoading: true,
    },
  },
};

export default connect(mapStateToProp, mapDispatchToProp)(Authors);
