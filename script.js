let currSong = new Audio();;
let albumspath = 'http://127.0.0.1:3000/Web%20Devlopment%20-%20CodeWithHarry/Wave-Player/songs/'
const play_icon = document.getElementById("play");
// fetch all songs
async function getSongs(folder) {
  const songsFolder = await fetch(folder);
  const responseText = await songsFolder.text();
  let div = document.createElement('div');
  div.innerHTML = responseText;
  const as = div.getElementsByTagName('a');
  songs = [];
  for (let a of as) {
    if (a.href.endsWith('.mp3')) {
      songs.push(a);
    }
  }
  return songs;
}

//load all songs in the playlist
async function loadSongs(folder) {
  let songs = await getSongs(folder);
  const playlist = document.getElementById("playlist");
  playlist.innerHTML = "";
  for (let song of songs) {
    song.href = "#";
    let li = document.createElement("li");
    const music_icon = document.createElement("img");
    music_icon.src = "./asserts/svgs/music.svg";
    const play_icon = document.createElement("img");
    play_icon.src = "./asserts/svgs/play.svg";
    play_icon.id = "ply";
    li.appendChild(music_icon);
    li.appendChild(song);
    li.appendChild(play_icon);
    playlist.appendChild(li);
  }
}

// for playing music
playMusic = (name, folder) => {
  currSong.src = folder + name;
  currSong.play();
  play_icon.src = "./asserts/svgs/pause.svg";
  document.getElementsByClassName("song_info")[0].innerHTML = name;
}

//format the time in mm:ss format
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

//volume control 
async function volumeControl(container_name) {
  let vol_rocker = document.querySelector(container_name).getElementsByClassName("vol_rocker")[0];

  vol_rocker.addEventListener("input", (e) => {
    let icon = document.querySelector(container_name).getElementsByClassName("vol_big")[0].getElementsByTagName("img")[0];
    value = e.target.value;
    if (value == 0) {
      icon.src = "./asserts/svgs/vol_zero.svg";
    }
    else if (value < 50) {
      icon.src = "./asserts/svgs/vol_mid.svg";
    }
    else {
      icon.src = "./asserts/svgs/vol_full.svg";
    }
    currSong.volume = value / 100;
  });

  let vol_icon = document.querySelector(container_name).getElementsByClassName("vol_big")[0];
  vol_icon.addEventListener("click", () => {
    let icon = vol_icon.getElementsByTagName("img")[0];

    if (currSong.muted) {
      currSong.muted = false;
      if (currSong.volume == 0) {
        icon.src = "./asserts/svgs/vol_zero.svg";
      }
      else if (currSong.volume < 0.5) {
        icon.src = "./asserts/svgs/vol_mid.svg";

      }
      else if (currSong.volume >= 0.5) {
        icon.src = "./asserts/svgs/vol_full.svg";
      }
    }
    else {
      currSong.muted = true;
      icon.src = "./asserts/svgs/vol_muted.svg";
    }
  });
}

async function load_albums() {
  const albumsFolder = await fetch(albumspath)
  let responseText = await albumsFolder.text();
  let div = document.createElement('div');
  div.innerHTML = responseText;
  const anchors = div.getElementsByTagName('a');
  albums = [];
  Array.from(anchors).forEach((anchor) => {
    if (anchor.href.endsWith('/')) {
      albums.push(anchor.innerHTML);
    }
  });
  let cardContainer = document.getElementsByClassName("cards_container")[0];
  for (let i = 1; i < albums.length; i++) {
    let infoData = await fetch(albumspath + albums[i] + 'info.json');
    let info = await infoData.json();
    cardContainer.innerHTML += `<div class="card">
                    <div class="play_btn">
                        <img src="./asserts/svgs/play.svg" alt="" ">
                    </div>
                    <img class="contain playlistName" src='${info.album_art}' data-album="${albums[i]}"
                        alt="img">
                    <h3 class="contain">${info.name}</h3>
                    <a class="contain" href="">${info.artist}</a>
                </div>`;
  }
}
async function main() {
  await load_albums();
  let card = document.querySelectorAll(".card");
  let folder;
  if (card) {
    card.forEach((card) => {
      card.addEventListener("click", async (e) => {
        folder = albumspath + e.currentTarget.querySelector(".playlistName").dataset.album;
        let loading = await loadSongs(folder);
        let songs_names = [];
        Array.from(document.getElementById("playlist").getElementsByTagName("li")).forEach((element) => {
          let name = element.getElementsByTagName("a")[0].innerText;
          songs_names.push(name);
          
          element.addEventListener("click", (e) => {
            document.title = name;
            playMusic(name, folder)
          });
        });


        console.log("Songs in playlist: ", songs_names);
        document.getElementById("prev").addEventListener("click", () => {
          let current_song_name = document.getElementsByClassName("song_info")[0].innerText;
          let index = songs_names.indexOf(current_song_name);
          if (index > 0) {
            playMusic(songs_names[index - 1], folder);
            document.title = songs_names[index - 1];
          }
        });

        document.getElementById("next").addEventListener("click", () => {
          let current_song_name = document.getElementsByClassName("song_info")[0].innerText;
          let index = songs_names.indexOf(current_song_name);
          if (index < songs_names.length - 1 && index != -1) {
            playMusic(songs_names[index + 1], folder);
            document.title = songs_names[index + 1];
          }
        });
      });

    });
  }
  else {
    folder = albumspath + 'misceleneous/';
  }



  document.getElementById("play").addEventListener("click", () => {
    if (currSong.paused) {
      currSong.play();
      play_icon.src = "./asserts/svgs/pause.svg";
    } else {
      currSong.pause();
      play_icon.src = "./asserts/svgs/play.svg";
    }

  });
  currSong.addEventListener("timeupdate", () => {
    document.getElementsByClassName("song_time")[0].innerText = `${formatTime(currSong.currentTime)} / ${formatTime(currSong.duration)}`;
    const progress = (currSong.currentTime / currSong.duration) * 100;
    document.querySelector(".circle").style.left = `${progress}%`;
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();
    let perc = (e.offsetX / rect.width) * 100;
    document.querySelector(".circle").style.left = `${perc}%`;
    currSong.currentTime = (perc * currSong.duration) / 100;
  });

  document.querySelector(".ham_songs").addEventListener("click", () => {
    document.querySelector(".left_box").style.left = "0";
  })

  document.querySelector(".close_lib").addEventListener("click", () => {
    document.querySelector(".left_box").style.left = "-500px";
  })
  if (window.innerWidth <= 830) {
  document.querySelector(".ham_cont :nth-child(1)").addEventListener("click", () => {
    document.querySelector(".ham2").style.display = "flex";
    document.querySelector(".ham2").style.right = "0px";
    document.querySelector(".ham_cont :nth-child(1)").style.display = "none";
    document.querySelector(".ham_cont :nth-child(2)").style.display = "block";
  });
  
  document.querySelector(".ham_cont :nth-child(2)").addEventListener("click", () => {
    document.querySelector(".ham2").style.display = "none";
    document.querySelector(".ham2").style.right = "-200px";
    document.querySelector(".ham_cont :nth-child(2)").style.display = "none";
    document.querySelector(".ham_cont :nth-child(1)").style.display = "block";
  });
}
else {
  document.querySelector(".ham_cont :nth-child(1)").addEventListener("click", () => {
    document.querySelector(".ham1").style.display = "flex";
    document.querySelector(".ham1").style.right = "0px";
    document.querySelector(".ham_cont :nth-child(1)").style.display = "none";
    document.querySelector(".ham_cont :nth-child(2)").style.display = "block";
  });
  
  document.querySelector(".ham_cont :nth-child(2)").addEventListener("click", () => {
    document.querySelector(".ham1").style.display = "none";
    document.querySelector(".ham1").style.right = "-200px";
    document.querySelector(".ham_cont :nth-child(2)").style.display = "none";
    document.querySelector(".ham_cont :nth-child(1)").style.display = "block";
  });
}

  // volume control
  if (window.innerWidth <= 830) {
    volumeControl(".vol_cont_2");
  }
  else {
    volumeControl(".vol_cont");
  }

}
main();
