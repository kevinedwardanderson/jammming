import styles from "../modules/Track.module.css";

function Track({ item, handleClick }) {
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.columnLeft}>
        <span className={styles.song}>{item.trackName}</span>
        <span className={styles.artist}>{item.artistName}</span>
      </div>
      <div className={styles.columnRight}>
        {/* <span className={styles.album}>Album: {item.albumName}</span> */}
        <img src={item.albumImage} alt="album cover" width="40px" />
      </div>
    </div>
  );
}

export default Track;
