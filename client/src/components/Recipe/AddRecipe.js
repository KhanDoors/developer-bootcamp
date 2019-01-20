import React, { Component } from "react";

import { Mutation } from "react-apollo";
import { ADD_RECIPE, GET_ALL_RECIPES } from "../queries/index";
import Error from "../Error";
import { withRouter } from "react-router-dom";

class AddRecipe extends Component {
  state = {
    name: "",
    instructions: "",
    category: "Javascript",
    description: "",
    username: ""
  };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.setState({
        name: "",
        instructions: "",
        category: "Javascript",
        description: "",
        username: ""
      });
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { name, instructions, category, description, username } = this.state;

    const isInvalid = !name || !instructions || !category || !description;
    return isInvalid;
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  render() {
    const { name, instructions, category, description, username } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, instructions, category, description, username }}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Video</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Lesson Name"
                  onChange={this.handleChange}
                  value={name}
                />
                <select name="category" onChange={this.handleChange}>
                  value={category}
                  <option value="HTML-CSS">HTML-CSS</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="C+">C+</option>
                  <option value="C++">C++</option>
                  <option value="Mongo">MongoDB</option>
                  <option value="Mysql">MySQL</option>
                  <option value="React">React</option>
                  <option value="Vue">Vue</option>
                  <option value="Angular">Angular</option>
                  <option value="Express">Express</option>
                  <option value="Node">Node</option>
                  <option value="MERN">MERN Stack</option>
                  <option value="MEAN">MEAN Stack</option>
                  <option value="Graphql">Graphql</option>
                  <option value="UI/UXDesign">UI/UXDesign</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <textarea
                  name="instructions"
                  placeholder="Instructions"
                  onChange={this.handleChange}
                  value={instructions}
                />
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddRecipe);
