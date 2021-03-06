import React, { Component } from "react";

import { Mutation } from "react-apollo";
import {
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_USER_RECIPES
} from "../queries/index";
import Error from "../Error";
import { withRouter } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
import withAuth from "../withAuth";

class AddRecipe extends Component {
  state = {
    name: "",
    imageUrl: "",
    instructions: "",
    category: "HTML-CSS",
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

  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ instructions: newContent });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.setState({
        name: "",
        imageUrl: "",
        instructions: "",
        category: "HTML-CSS",
        description: "",
        username: ""
      });
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { name, imageUrl, instructions, category, description } = this.state;

    const isInvalid =
      !name || !imageUrl || !instructions || !category || !description;
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
    const {
      name,
      imageUrl,
      category,
      description,
      instructions,
      username
    } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          imageUrl,
          category,
          description,
          instructions,
          username
        }}
        refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="main-title">What have you got?</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addRecipe)}
              >
                <label htmlFor="name">Lesson</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Lesson Name"
                  onChange={this.handleChange}
                  value={name}
                />
                <label htmlFor="imageUrl">Lesson Image</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Lesson Image Url"
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <label htmlFor="category">Category of Tech</label>
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="HTML-CSS">HTML-CSS</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="CS">C#</option>
                  <option value="Cpp">C++</option>
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
                  <option value="Docker">Docker</option>
                  <option value="AI-ML">AI-ML</option>
                  <option value="DevOps">DevOps</option>
                  <option value="UI-UXDesign">UI/UXDesign</option>
                </select>
                <label htmlFor="description">Lesson Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <label htmlFor="instructions">Add Instructions</label>
                <CKEditor
                  name="instructions"
                  content={instructions}
                  events={{ change: this.handleEditorChange }}
                />
                {/* <textarea
                  name="instructions"
                  placeholder="Instructions"
                  onChange={this.handleChange}
                  value={instructions}
                /> */}
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                  style={{ margin: "2em" }}
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

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
