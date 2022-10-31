import React from "react";
import "./styles.css";

const CardItem = ({ icon, name, value }) => {
  return (
    <div className="item-container">
      <div className="item">
        <img alt="itemLogo" src={icon}></img>
        <p>{name}</p>
      </div>
      <p>{value}</p>
    </div>
  );
};

export default CardItem;
