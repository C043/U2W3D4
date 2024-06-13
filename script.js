const imgBtn1 = document.getElementById("img-loader-1");
const cardSpace = document.getElementById("card-container");
console.log(cardSpace);
cardSpace.innerHTML = "";

const singleCardGen = (src, title, photographer, id) => {
  const col = document.createElement("div");
  col.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";

  const img = document.createElement("img");
  img.src = src;
  img.alt = title;

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = title;

  const p = document.createElement("p");
  p.className = "card-text";
  p.innerText = photographer;

  const flexContainer = document.createElement("div");
  flexContainer.className = "d-flex justify-content-between align-items-center";

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const hideBtn = document.createElement("button");
  hideBtn.className = "btn btn-sm btn-outline-danger";
  hideBtn.innerText = "Hide";
  hideBtn.type = "button";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerText = "Edit";
  editBtn.type = "button";

  const small = document.createElement("small");
  small.className = "text-muted";
  small.innerText = id;

  btnGroup.append(hideBtn, editBtn);
  flexContainer.append(btnGroup, small);
  body.append(h5, p, flexContainer);
  card.append(img, body);
  col.append(card);
  cardSpace.append(col);
};

/* funzione che genera tutte le card al click dei pulsanti */
const cardGen = (ev, query) => {
  if (query === 1) {
    console.log(query);
    fetch("https://api.pexels.com/v1/search?query=dog", {
      headers: {
        Authorization: "xVuah0OyDOwHaZluvvqyhPLNuxVpCwR4PpkHfPQtYvjYwrwayVXUBwNQ",
      },
    })
      .then(resp => resp.json())
      .then(images => {
        const imgArray = images.photos;
        console.log(imgArray);
        imgArray.forEach(img => {
          const { src, alt, photographer, id } = img;
          singleCardGen(src.portrait, alt, photographer, id);
        });
      })
      .catch(err => console.log(err));
  } else {
    ev.preventDefault();
  }
};

const eventHandle = () => cardGen("click", 1);

imgBtn1.onclick = eventHandle;
