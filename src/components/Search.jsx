import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import style from "./Search.module.css";
import { UseQuery } from "../utils/UseQuery";

export function Search() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const query = UseQuery();
  const search = query.get("search");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/?search=" + searchText);
  };
  useEffect(() => {
    setSearchText(search || "");
  }, [search]);

  return (
    <form className={style.searchContainer} onSubmit={handleSubmit}>
      <div className={style.searchBox}>
        <input
          className={style.searchInput}
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className={style.searchButton} type="submit">
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
}
