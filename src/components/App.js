import React from "react";
import Header from "./Header.js";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  omething;

  componentDidMount() {
    const { params } = this.props.match;
    //first reinstant localStorage.
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    console.log("Unmount");
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    const order = JSON.stringify(this.state.order);
    console.log(order);
    localStorage.setItem(this.props.match.params.storeId, order);
    console.log("it updated");
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  updateFish = (key, updateFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updateFish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes }; //get the previous state.
    fishes[key] = null; //for firebase to remove the fish from its data it needs to be set to null.
    this.setState({ fishes });
  };

  deleteOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  addFish = fish => {
    //Take a copy of the existing state.
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;

    this.setState({
      fishes
    });
  };

  addToOrder = key => {
    //take a copy of state.
    const order = { ...this.state.order };

    //add to order or update the order
    order[key] = order[key] + 1 || 1;

    //set state to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header subtitle="as fresh as it gets" />
          <ul className="fishes">
            {/* USE {} to tell JSX that you want to use basic javascript here. */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                fishDetails={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order deleteOrder = {this.deleteOrder} fishes={this.state.fishes} orders={this.state.order} />
        <Inventory
          deleteFish={this.deleteFish}
          updateFish={this.updateFish}
          addFish={this.addFish}
          fishes={this.state.fishes}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
3;
export default App;
