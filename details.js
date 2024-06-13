const params = new URLSearchParams(window.location.search);
const id = params.get("photoId");
const body = document.querySelector("body");
console.log(id);

window.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector("img");
  const title = document.querySelector("h1");
  const photographerUrl = document.getElementById("photographer");
  const url = "https://api.pexels.com/v1/photos/" + id;
  fetch(url, {
    headers: {
      Authorization: "xVuah0OyDOwHaZluvvqyhPLNuxVpCwR4PpkHfPQtYvjYwrwayVXUBwNQ",
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then(imgData => {
      img.src = imgData.src.original;
      title.innerText = imgData.alt;
      photographerUrl.innerText = imgData.photographer;
      photographerUrl.href = imgData.photographer_url;
      photographerUrl.className = "btn mb-4";
      /* converto il colore hex in rgba e assegno al body un tema scuro 
      se il colore è troppo scuro */
      const hex = imgData.avg_color;
      const red = parseInt(hex.substring(1, 3), 16);
      const green = parseInt(hex.substring(3, 5), 16);
      const blue = parseInt(hex.substring(5, 7), 16);
      const rgba = `rgba(${red}, ${green}, ${blue}, 1)`;
      body.style.backgroundColor = rgba;

      if (red + green + blue < 500) {
        body.setAttribute("data-bs-theme", "dark");
      }
    })
    .catch(err => console.log(err));
});
