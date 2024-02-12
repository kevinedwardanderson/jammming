import { useState } from "react";
import styles from "../modules/Searchbar.module.css";
import Spotify from "../util/Spotify";

function Searchbar({ updateSearch, query, setQuery, setSearchResults2 }) {
  function handleInput(e) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    updateSearch((search) =>
      search.filter((item) => item.songTitle.toLowerCase().includes(query))
    );
  }

  async function spotSearch() {
    const newSearch = await Spotify.search(query);
    setSearchResults2(newSearch);
  }

  return (
    <div className={styles.searchbar}>
      <input type="text" id="searchbar" value={query} onChange={handleInput} />
      <button onClick={spotSearch}>Search</button>
    </div>
  );
}

export default Searchbar;
