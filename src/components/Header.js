import React from "react";

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

export default Header;