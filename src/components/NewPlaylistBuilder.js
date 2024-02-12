import PlaylistTitleBox from "./PlaylistTitleBox";
import Track from "./Track";
import Spotify from "../util/Spotify";
import styles from "../modules/NewPlaylistBuilder.module.css";

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
    if (newPlaylist.tracklist.length && newPlaylist.name) {
      console.log(newPlaylist);
      Spotify.createPlaylist(newPlaylist);
      setNewPlaylist({
        name: "New Playlist",
        description: "New playlist",
        public: false,
        tracklist: [],
      });
    } else {
      alert("Add tracks and playlist title to save");
    }
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
      {newPlaylist.tracklist.length && (
        <button onClick={savePlaylist} className={styles.btnSave}>
          Save Playlist to Spotify
        </button>
      )}
    </>
  );
}

export default NewPlaylistBuilder;
