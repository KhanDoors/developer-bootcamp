import React from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "./queries";
import RecipeItem from "./Recipe/RecipeItem";

const App = () => (
  <div className="App">
    <h5>
      This app was designed as a coding lesson library. I have used most of
      these lessons to build my own knowledge. I give my opinion about the
      different links as a cheatsheet for those wanting to learn to code. Please
      choose a lesson you are interested in and try to have some fun while
      learning something new!
    </h5>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        return (
          <ul>
            {data.getAllRecipes.map(recipe => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
