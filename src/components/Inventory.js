import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

export default class Inventory extends React.Component {
  render() {
    const fishes = Object.keys(this.props.fishes);
    return (
      <div className="inventory">
        {fishes.map(key => (
          <EditFishForm
            key={key}
            index = {key}
            updateFish={this.props.updateFish}
            fish={this.props.fishes[key]}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes{" "}
        </button>
      </div>
    );
  }
}
