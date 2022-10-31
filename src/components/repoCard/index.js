import React, { useCallback, useEffect, useState } from "react";
import CardItem from "../cardItem";
import "./styles.css";
import axios from "axios";
import moment from "moment";
import Star from "../../assets/star.svg";
import Fork from "../../assets/fork.svg";
import Issue from "../../assets/issue.svg";
import Age from "../../assets/age.svg";
import Plus from "../../assets/plus.svg";
import License from "../../assets/license.svg";
import Language from "../../assets/language.svg";

export const RepoCard = ({ handleRemove, url }) => {
  const [repo, setRepo] = useState({});

  const fetchRepo = useCallback(async () => {
    try {
      const result = await axios(url);
      setRepo(result);
    } catch (e) {
      console.log(e);
    }
  }, [url]);

  useEffect(() => {
    fetchRepo();
  }, [fetchRepo]);

  const items = [
    {
      icon: Star,
      name: "Stars",
      value: repo.data?.stargazers_count,
    },
    {
      icon: Fork,
      name: "Forks",
      value: repo.data?.forks,
    },
    {
      icon: Issue,
      name: "Open issues",
      value: repo.data?.open_issues_count,
    },
    {
      icon: Age,
      name: "Age",
      value: moment(repo.data?.created_at, "YYYYMMDD").fromNow(),
    },
    {
      icon: Plus,
      name: "Last commit",
      value: moment(repo.data?.updated_at, "YYYYMMDD").fromNow(),
    },
    {
      icon: License,
      name: "License",
      value: repo.data?.license?.name ?? "NA",
    },
    {
      icon: Language,
      name: "Language",
      value: repo.data?.language,
    },
  ];
  return (
    <>
      {repo.data?.full_name && (
        <div className="card-container">
          <a
            className={"repo-link"}
            href={repo?.data?.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="content">
              <div className="card-header">
                <p>{repo?.data?.full_name}</p>
              </div>
              {items.map((item) => (
                <CardItem
                  icon={item.icon}
                  name={item.name}
                  value={item.value}
                />
              ))}
            </div>
          </a>
          <div className="remove">
            <button onClick={() => handleRemove(url)}> Remove repo</button>
          </div>
        </div>
      )}
    </>
  );
};
