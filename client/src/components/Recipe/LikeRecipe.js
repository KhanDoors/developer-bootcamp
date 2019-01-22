import React, { Component } from "react";
import withSession from "../withSessions";

import { Mutation } from "react-apollo";

import { LIKE_RECIPE } from "../queries";

class LikeRecipe extends Component {
  state = {
    username: ""
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username } = this.props.session.getCurrentUser;
      console.log(username);
      this.setState({ username });
    }
  }

  handleLike = likeRecipe => {
    likeRecipe().then(async ({ data }) => {
      console.log(data);
      await this.props.refetch();
    });
  };

  render() {
    const { username } = this.state;
    const { _id } = this.props;
    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
        {likeRecipe =>
          username && (
            <button onClick={() => this.handleClick(likeRecipe)}>Like</button>
          )
        }
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
