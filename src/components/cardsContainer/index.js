import React from "react";
import { RepoCard } from "../repoCard";
import "./styles.css";

const CardsContainer = ({ handleRemove, urls }) => {
  return (
    <div className="container">
      {!!urls.length &&
        urls.map((url) => (
          <RepoCard handleRemove={handleRemove} key={url} url={url} />
        ))}
    </div>
  );
};

export default CardsContainer;
