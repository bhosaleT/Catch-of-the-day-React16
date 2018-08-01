import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";


export default class Fish extends React.Component {

  // The addition of proptypes for the fish component lets us add a shape checker which checks an object of a particular type with all the object elements having a specific type.
  static propTypes = {
    fishDetails: PropTypes.shape ({
      image: PropTypes.string,
      name : PropTypes.string,
      desc : PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };

    render() {
    const { image, name, price, desc, status } = this.props.fishDetails;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          onClick={() => {
            this.props.addToOrder(this.props.index);
          }}
          disabled={!isAvailable}
        >
          {isAvailable ? "Add to cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}
