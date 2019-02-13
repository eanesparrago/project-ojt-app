import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as postsActionCreators from "./data/posts/postsActionCreators";

export class Main extends Component {
  static propTypes = {};

  handleClick = () => {
    this.props.getPosts();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click me</button>

        <div>
          {this.props.posts.map(post => (
            <p>{post.title}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    posts: state.main.data.posts
  }),
  {
    addPost: postsActionCreators.addPost,
    getPosts: postsActionCreators.getPosts
  }
)(Main);
