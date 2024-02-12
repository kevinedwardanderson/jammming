// import { useState } from "react";
import Track from "./Track.js";
// import Spotify from "../util/Spotify.js";

function SearchResults({
  catalog,
  query,
  searchResults2,
  setNewPlaylist,
  newPlaylist,
}) {
  function togglePlaylist(track) {
    if (!newPlaylist.tracklist.includes(track)) {
      setNewPlaylist((currentPlaylist) => ({
        ...currentPlaylist,
        tracklist: [...currentPlaylist.tracklist, track],
      }));
    } else {
      setNewPlaylist((currentPlaylist) => ({
        ...currentPlaylist,
        tracklist: currentPlaylist.tracklist.filter(
          (currentTrack) => currentTrack !== track
        ),
      }));
    }
  }

  return (
    <>
      {searchResults2.map((item) => (
        <Track
          newPlaylist={newPlaylist}
          item={item}
          key={item.uri}
          handleClick={() => togglePlaylist(item)}
        />
      ))}
    </>
  );
}

export default SearchResults;
