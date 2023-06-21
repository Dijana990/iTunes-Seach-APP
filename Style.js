let term = "";

document.getElementById('loader').style.display = 'none';

const updateTerm = () => {
  
  term = document.getElementById("searchTerm").value;
  //check if the term exists
  if (!term || term === "") {
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.textContent = "Please enter a search term";
    errorContainer.style.display = "block";
  } else {
    const url = `https://itunes.apple.com/search?term=${term}`;
    const songContainer = document.getElementById("song");
    
    while (songContainer.firstChild) {
      songContainer.removeChild(songContainer.firstChild);
    }
    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        //console.log(data.results);
        const artist = data.results;
        
        return artist.map((result) => {
          //HTML element
          
          const article = document.createElement("article"),
            artist = document.createElement("p"),
            song = document.createElement("h4"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source");

          artist.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          audio.controls = true;

          article.appendChild(img);
          article.appendChild(artist);
          article.appendChild(song);
          article.appendChild(audio);
          audio.appendChild(audioSource);

          songContainer.appendChild(article);

          document.getElementById('loader').style.display = 'block';
        });
      })
      .catch((error) => {
        if (error.message === "404 Not Found") {
          console.log("404 Error: Page not found");
        } else {
          console.log("Request failed:", error);
        }
      });
  }
};
const searchBtn = document.getElementById("searchTermBtn");
const searchTermInput = document.getElementById("searchTerm");
searchBtn.addEventListener("click", updateTerm);
searchTermInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateTerm();
  }
});

document.addEventListener(
  "play",
  (event) => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] !== event.target) {
        audio[i].
      pause();
      }
    }
  },
  true
);
