// import { useState } from "react";
import styles from "../modules/PlaylistTitleBox.module.css";

function PlaylistTitleBox({ name, setNewPlaylist }) {
  // let input;

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const title = input;
  //   setNewPlaylist((currentPlaylist) => ({
  //     ...currentPlaylist,
  //     title: title,
  //   }));
  // }

  function handleInput(e) {
    setNewPlaylist((currentPlaylist) => ({
      ...currentPlaylist,
      name: e.target.value,
    }));
  }

  return (
    <div className={styles.titleBox}>
      <input
        type="text"
        placeholder="New Playlist"
        value={name}
        onChange={handleInput}
      />
    </div>
  );
}

export default PlaylistTitleBox;
