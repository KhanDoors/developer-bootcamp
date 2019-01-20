import React, { Component } from "react";

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

  render() {
    const { name, instructions, category, description } = this.state;
    return (
      <div className="App">
        <h2 className="App">Add Video</h2>
        <form className="form">
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
          <button type="submit" className="button-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddRecipe;
