import { useState } from "react";
import PlaylistTitleBox from "./PlaylistTitleBox";
import Track from "./Track";
import Spotify from "../util/Spotify";

function NewPlaylistBuilder({
  newPlaylist,
  setNewPlaylist,
  setUserPlaylistLibrary,
}) {
  function removeTrack(track) {
    setNewPlaylist((currentPlaylist) => ({
      ...currentPlaylist,
      tracklist: currentPlaylist.tracklist.filter(
        (currentTrack) => currentTrack !== track
      ),
    }));
  }

  // function savePlaylist() {
  //   console.log(newPlaylist);
  //   setUserPlaylistLibrary((userLibrary) => ({
  //     ...userLibrary,
  //     playlistLib: [...userLibrary.playlistLib, newPlaylist],
  //   }));
  //   setNewPlaylist({
  //     name: "",
  //     description: null,
  //     public: false,
  //     tracklist: [],
  //   });
  // }

  function savePlaylist() {
    console.log(newPlaylist);
    Spotify.createPlaylist(newPlaylist);
    setNewPlaylist({
      name: "New Playlist",
      description: "New playlist",
      public: false,
      tracklist: [],
    });
  }

  return (
    <>
      <PlaylistTitleBox
        name={newPlaylist.name}
        setNewPlaylist={setNewPlaylist}
      />
      {newPlaylist.tracklist.map((item) => (
        <Track
          item={item}
          key={item.uri}
          handleClick={() => removeTrack(item)}
          newPlaylist={newPlaylist}
        />
      ))}
      <button onClick={savePlaylist}>Save Playlist to Spotify</button>
    </>
  );
}

export default NewPlaylistBuilder;
