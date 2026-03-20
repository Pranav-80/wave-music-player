const fileInput = document.getElementById("fileInput");
const playlist = document.getElementById("playlist");
let audio = new Audio();

function toggleFileInput() {
    fileInput.addEventListener("change", (event) => {
    playlist.innerHTML = "";
    const files = event.target.files;
    var songInfo = {};
    Array.from(files).forEach(file => {
      const music_icon = document.createElement("img");
      music_icon.src = "./svgs/music.svg";
      const play_icon = document.createElement("img");
      play_icon.src = "./svgs/play.svg";
      play_icon.id = "ply";
      const li = document.createElement("li");
      console.log(li)
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = file.name;
      songInfo[file.name] = URL.createObjectURL(file);
      // play_icon.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   audio.src = URL.createObjectURL(file); 
      //   audio.play();
      // });
      li.appendChild(music_icon)
      li.appendChild(a); 
      li.appendChild(play_icon);
      playlist.appendChild(li);
      });
      console.log(songInfo);
      resolve(songInfo);
    });
}

async function main() {
  try{
  let songInfo = await toggleFileInput();
  console.log(songInfo);
  } catch (error) {
  console.error("Error:", error);
}
}
main(); 