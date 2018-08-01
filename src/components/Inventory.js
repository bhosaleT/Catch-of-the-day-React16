import React from "react";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";
import firebase from "firebase";

export default class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({user});
      }
    })
  }
   
  authHandler = async authData => {
    //1. Look up the current store in the firebase database.
    const store = await base.fetch(this.props.storeId, { context: this });
    //2. Claim it if there is no owner.
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    //3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logOut = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  render() {
    const logout = <button onClick={this.logOut}>Log Out</button>;

    //1. Checked if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //.Check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    //3. They must be the owner
    const fishes = Object.keys(this.props.fishes);
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {fishes.map(key => (
          <EditFishForm
            key={key}
            index={key}
            deleteFish={this.props.deleteFish}
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
