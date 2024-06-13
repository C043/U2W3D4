const params = new URLSearchParams(window.location.search);
const id = params.get("photoId");
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
      photographerUrl.className = "btn btn-link";
    })
    .catch(err => console.log(err));
});
