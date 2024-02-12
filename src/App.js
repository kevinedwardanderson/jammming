import "./App.css";
import Header from "./components/Header";
import dataSearch from "./data/mockdata_search";
// import dataPlaylist from "./data/mockdata_playlist";
import SearchResults from "./components/SearchResults";
import Column from "./components/Column";
import Searchbar from "./components/Searchbar";
import NewPlaylistBuilder from "./components/NewPlaylistBuilder";
import Footer from "./components/Footer";
import { useState } from "react";
import Spotify from "./util/Spotify";

function App() {
  let catalog = dataSearch;
  const [newPlaylist, setNewPlaylist] = useState({
    name: "New Playlist",
    description: "New playlist",
    public: false,
    tracklist: [],
  });
  const [userPlaylistLibrary, setUserPlaylistLibrary] = useState({
    user: "username",
    playlistLib: [],
  });
  const [query, setQuery] = useState("");
  const [searchResults2, setSearchResults2] = useState([]);

  Spotify.getAccessToken();

  // async function getPopular() {
  //   const newSearch = await Spotify.getPopular();
  //   setSearchResults2(newSearch);
  // }

  // getPopular();

  // console.log(newPlaylist);
  // console.log(userPlaylistLibrary);
  // console.log(catalog);

  return (
    <div className="App">
      <Header userPlaylistLibrary={userPlaylistLibrary} />
      <Column>
        <div className="column-header">
          <Searchbar
            query={query}
            setQuery={setQuery}
            setSearchResults2={setSearchResults2}
          />
        </div>
        <div className="column-body">
          <SearchResults
            query={query}
            catalog={catalog}
            searchResults2={searchResults2}
            newPlaylist={newPlaylist}
            setNewPlaylist={setNewPlaylist}
          />
        </div>
      </Column>
      <Column>
        <NewPlaylistBuilder
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          userPlaylistLibrary={userPlaylistLibrary}
          setUserPlaylistLibrary={setUserPlaylistLibrary}
        />
      </Column>
      <Footer />
    </div>
  );
}

export default App;
