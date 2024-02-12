import { useState } from "react";
import Track from "./Track.js";
import Spotify from "../util/Spotify.js";

function SearchResults({
  catalog,
  query,
  searchResults2,
  setNewPlaylist,
  newPlaylist,
}) {
  const searchResults = catalog.filter((track) =>
    track.trackName.toLowerCase().includes(query)
  );

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
      {/* {searchResults.map((item) => (
        <Track
          item={item}
          key={item.id}
          handleClick={() => togglePlaylist(item)}
        />
      ))} */}

      {searchResults2.map((item) => (
        <Track
          item={item}
          key={item.uri}
          handleClick={() => togglePlaylist(item)}
        />
      ))}
    </>
  );
}

export default SearchResults;
