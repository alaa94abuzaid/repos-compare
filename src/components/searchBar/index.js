import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import SearchIcon from "../../assets/searchIcon.svg";
import axios from "axios";

export const SearchBar = ({ setUrls, urls }) => {
  const [value, setValue] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setError(null);
    setValue(e.target.value);
  };

  const fetchRepos = useCallback(async () => {
    try {
      const result = await axios(`https://api.github.com/repositories`);
      setRepos(result.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSearch = async (item) => {
    setValue(item.full_name);

    const index = urls.indexOf(item.url);
    if (index > -1) {
      setError("Repo is already added");
    } else {
      setUrls([...urls, item.url]);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <div className="search-container">
      <div className="search-inner">
        <input
          placeholder="Search for a repository"
          type="text"
          value={value}
          onChange={onChange}
        />
        <img alt="searchIcon" src={SearchIcon} className="search-icon" />
      </div>
      <p className="error">{error ?? ""}</p>
      <div className="dropdown">
        {!!repos.length &&
          repos
            .filter((item) => {
              const searchTerm = value.toString().toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchBar;
