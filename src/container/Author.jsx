import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorAction from '../action/authors';

class Author extends Component {
  constructor(props) {
    super(props);
    const { id } = props;
    props.fetchAuthor(id);
    this.renderAuthorOtherWorks = this.renderAuthorOtherWorks.bind(this);
  }

  renderAuthorOtherWorks() {
    const { authors } = this.props;

    return _.map(authors.Author.data.data.author.books, (bookEle, key) => (
      <li key={key}>
        {bookEle.name}
      </li>
    ));
  }

  render() {
    const { authors } = this.props;
    if (authors.Author.isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    if (authors.Author.error) {
      return (
        <div>Something went wrong</div>
      );
    }

    const { goBack } = this.props;

    return (
      <div className="container">
        <a href="javascript:void(0);" onClick={() => { goBack(); }}>&lt;back</a>
        <h1>{authors.Author.data.data.author.name}</h1>
        <h2>Author&apos;s Works</h2>
        <ul>
          {this.renderAuthorOtherWorks()}
        </ul>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  authors: state.authors,
});

const mapDispatchToProp = dispatch => ({
  fetchAuthor: id => dispatch(AuthorAction.fetchAuthor(dispatch, id)),
});

Author.propTypes = {
  authors: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  id: PropTypes.string.isRequired,
  fetchAuthor: PropTypes.func.isRequired,
  goBack: PropTypes.func,
};

Author.defaultProps = {
  goBack: () => {},
};
export default connect(mapStateToProp, mapDispatchToProp)(Author);
