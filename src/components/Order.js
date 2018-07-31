import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    //number of orders.
    const count = this.props.orders[key];
    const isAvailable = fish && fish.status === "available";
    // the localstorage is faster than firebase so there are no fish to bring back from order.
    if (!fish) {
      return null;
    }

    if (isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 250, exit: 250 }}
        >
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                {" "}
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span> {count} </span>
                </CSSTransition>{" "}
              </TransitionGroup>
              lbs {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.deleteOrder(key)}>
                &times;
              </button>
            </span>
          </li>
        </CSSTransition>
      );
    } else {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 250, exit: 250 }}
        >
          <li key={key}>
            {/* the ternary operator here is to check if the fish completely is not available if so then just return fish. */}
            Sorry {fish ? fish.name : "fish"} is not available;
          </li>
        </CSSTransition>
      );
    }
  };

  render() {
    const orderIds = Object.keys(this.props.orders);
    //REDUCE just gives us a sum of all the stuff inside.
    const total = orderIds.reduce((prevTotal, key) => {
      //number of fishes.
      const fish = this.props.fishes[key];
      //number of orders.
      const count = this.props.orders[key];
      // check if the fish is not deleted and the fish.status is available.
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>

        <TransitionGroup component="ul" className="order">
          {/* looping through all the fishes that are in orders array */}
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
