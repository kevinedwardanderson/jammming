import styles from "../modules/Header.module.css";
import Spotify from "../util/Spotify";

function Header({ userPlaylistLibrary }) {
  function handleClick() {
    console.log(userPlaylistLibrary);
    Spotify.getPlaylists();
  }

  return (
    <header>
      <h1 className={styles.logo}>JammBox</h1>
      <h1 className={styles.library} onClick={handleClick}>
        Library
      </h1>
    </header>
  );
}

export default Header;
