import React from "react";

class EditFishForm extends React.Component {
  //  when the event is changed React nullifies it but we can catch it using event.currentTarget.value
  // then we change the event.currentTarget.name i.e. input field by the new value.
  // and change the state. by getting a function dropped down through app.js
  handleChange = event => {
    //update that fish
    const updateFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updateFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          // this name is how we find out which input was changed
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
      </div>
    );
  }
}

export default EditFishForm;
