const clientId = "053905de29ea41d5ae3db0dcca7a68f4"; // Insert client ID here.
const redirectUri = "http://localhost:3000/"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

// const client_id = encodeURIComponent("053905de29ea41d5ae3db0dcca7a68f4");
//   const client_secret = "7c9cb6b7c8d74767ada298a37d458208";
//   const redirect_uri = encodeURIComponent("http://localhost:3000/");
//   const response_type = "token";
//   const base_url = "https://accounts.spotify.com/authorize";

//   async function getAuth() {
//     const response = await fetch(
//       `${base_url}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`
//     )
//       .then((response) => response.json())
//       .then((response) => console.log(response));
//   }

//   getAuth();

// /recommendations?target_popularity=100

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getPopular() {
    const data = await fetch(
      "https://api.spotify.com/v1/recommendations?seed_tracks=0c6xIDDpzE81m2q797ordA&target_popularity=85",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => response.json());

    const results = await data.tracks.items.map((item) => ({
      trackName: item.name,
      artistName: item.artists[0].name,
      albumName: item.album.name,
      releaseDate: item.album.release_date,
      uri: item.uri,
      albumImage: item.album.images[2].url,
    }));

    // console.log(results.tracks.items);
    console.log(results);
    return results;
  },

  async search(query) {
    const data = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => response.json());

    const results = await data.tracks.items.map((item) => ({
      trackName: item.name,
      artistName: item.artists[0].name,
      albumName: item.album.name,
      releaseDate: item.album.release_date,
      uri: item.uri,
      albumImage: item.album.images[2].url,
    }));

    // console.log(results.tracks.items);
    console.log(results);
    return results;
  },

  // async getPlaylists() {
  //   const accessToken = await Spotify.getAccessToken();
  //   let user_id;
  //   let playlist_id;
  //   const data = await fetch(`https://api.spotify.com/v1/me`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }).then((response) => response.json());

  //   console.log(data);
  //   user_id = data.id;

  //   const playlists = await fetch(
  //     `https://api.spotify.com/v1/users/${user_id}/playlists`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   ).then((response) => response.json());

  //   console.log(playlists.items[0].name);
  // },

  async createPlaylist(playlist) {
    const accessToken = await Spotify.getAccessToken();
    let trackList = [];
    playlist.tracklist.forEach((track) => {
      trackList.push(track.uri);
    });
    let user_id;
    let data = await fetch(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());

    console.log(data);
    user_id = data.id;

    let playlist_id;
    data = await fetch(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: playlist.name,
        }),
      }
    ).then((response) => response.json());

    playlist_id = data.id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uris: trackList,
      }),
    });
    console.log(trackList);
  },

  createPlaylist2(playlist) {
    const accessToken = Spotify.getAccessToken();
    let trackList = [];
    playlist.tracklist.forEach((track) => {
      trackList.push(track.uri);
    });
    let user_id;
    let data = fetch(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());

    console.log(data);
    user_id = data.id;

    let playlist_id;
    data = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: playlist.name,
      }),
    }).then((response) => response.json());

    playlist_id = data.id;

    fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uris: trackList,
      }),
    });
    console.log(trackList);
  },

  // description: playlist.description,
  // public: playlist.public,
  // search(term) {
  //   const accessToken = Spotify.getAccessToken();
  //   return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((jsonResponse) => {
  //       if (!jsonResponse.tracks) {
  //         return [];
  //       }
  //       return jsonResponse.tracks.items.map((track) => ({
  //         id: track.id,
  //         name: track.name,
  //         artist: track.artists[0].name,
  //         album: track.album.name,
  //         uri: track.uri,
  //       }));
  //     });
  // },

  //   savePlaylist(name, trackUris) {
  //     if (!name || !trackUris.length) {
  //       return;
  //     }

  //     const accessToken = Spotify.getAccessToken();
  //     const headers = { Authorization: `Bearer ${accessToken}` };
  //     let userId;

  //     return fetch("https://api.spotify.com/v1/me", { headers: headers })
  //       .then((response) => response.json())
  //       .then((jsonResponse) => {
  //         userId = jsonResponse.id;
  //         return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //           headers: headers,
  //           method: "POST",
  //           body: JSON.stringify({ name: name }),
  //         })
  //           .then((response) => response.json())
  //           .then((jsonResponse) => {
  //             const playlistId = jsonResponse.id;
  //             return fetch(
  //               `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
  //               {
  //                 headers: headers,
  //                 method: "POST",
  //                 body: JSON.stringify({ uris: trackUris }),
  //               }
  //             );
  //           });
  //       });
  //   },
};

export default Spotify;
