import styles from "../modules/Track.module.css";

function Track({ item, newPlaylist, handleClick }) {
  const inPlaylist = newPlaylist.tracklist.includes(item)
    ? styles.inPlaylist
    : "";
  return (
    <div className={`${styles.container} ${inPlaylist}`} onClick={handleClick}>
      <div className={(styles.columnLeft, styles.column)}>
        <i
          className={`${styles.btnAdd}, ${inPlaylist}, material-symbols-outlined`}
        >
          add_circle
        </i>
        <span className={styles.song}>{item.trackName}</span>
        <span className={styles.artist}>{item.artistName}</span>
      </div>
      <div className={(styles.columnRight, styles.column)}>
        {/* <span className={styles.album}>Album: {item.albumName}</span> */}
        <img src={item.albumImage} alt="album cover" width="40px" />
      </div>
    </div>
  );
}

export default Track;
