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
            <option value="React">React</option>
            <option value="MERN">MERN Stack</option>
            <option value="Javascript">Javascript</option>
            <option value="Node">Node</option>
            <option value="Express">Express</option>
          </select>
          <input
            type="text"
            name="description"
            placeholder="Add Description"
            onChange={this.handleChange}
            value={description}
          />
          <textarea
            name="instructions"
            placeholder="tips"
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
