import React, { Component } from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "./queries";
import RecipeItem from "./Recipe/RecipeItem";
import posed from "react-pose";
import Spinner from "./Spinner";

const RecipeList = posed.ul({
  shown: {
    x: "0%",
    staggerChildren: 300
  },
  hidden: {
    x: "-100%"
  }
});

class App extends Component {
  state = {};

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          <strong>KhanDoor Library</strong>
        </h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            const { on } = this.state;
            return (
              <RecipeList pose={on ? "shown" : "hidden"} className="cards">
                {data.getAllRecipes.map(recipe => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </RecipeList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
