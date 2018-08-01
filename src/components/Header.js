import React from "react";
import PropTypes from "prop-types";

const Header = (props) => (
      <header className="top">
        <h1>Catch 
          <span className = "ofThe">
          <span className = "of">Of</span> 
          <span className = "the">the</span> 
          </span> 
          Day</h1>
        <h3 className="tagline">
          <span>{props.subtitle}</span>
        </h3>
      </header>
    )

// Header.propTypes just helps the developer configure the props to take only one particular type of dataType.
Header.propTypes = {
  subtitle: PropTypes.string.isRequired
};

export default Header;