const imgBtn1 = document.getElementById("img-loader-1");
const imgBtn2 = document.getElementById("img-loader-2");
const form = document.querySelector("form");

const cardSpace = document.getElementById("card-container");
cardSpace.innerHTML = "";

const delCard = ev => {
  const target = ev.currentTarget.closest(".col-md-4");
  target.remove();
};

const modal = () => {};

/* funzione che genera una carta */
const singleCardGen = (src, title, photographer, id) => {
  const col = document.createElement("div");
  col.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";

  const img = document.createElement("img");
  img.src = src;
  img.alt = title;
  img.onclick = function (ev) {
    const imgObj = {
      title: title,
      id: id,
      src: src,
    };
    console.log(imgObj);
    console.log(window.location);
    window.location.replace("/details.html?photoId=" + imgObj.id);
  };

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
  hideBtn.onclick = delCard;

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerText = "View";
  editBtn.type = "button";
  editBtn.setAttribute("data-bs-toggle", "modal");
  editBtn.setAttribute("data-bs-target", "#imgModal");
  editBtn.onclick = function () {
    const imgObj = {
      title: title,
      id: id,
      src: src,
    };

    const imgModal = document.querySelector(".modal-body img");
    imgModal.src = imgObj.src;
  };

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

const get = url => {
  fetch(url, {
    headers: {
      Authorization: "xVuah0OyDOwHaZluvvqyhPLNuxVpCwR4PpkHfPQtYvjYwrwayVXUBwNQ",
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw (err = "Qualcosa è andato storto");
      }
    })
    .then(images => {
      const imgArray = images.photos;
      console.log(imgArray);
      imgArray.forEach(img => {
        const { src, alt, photographer, id } = img;
        singleCardGen(src.portrait, alt, photographer, id);
      });
    })
    .catch(err => console.log(err));
};

/* funzione che genera tutte le card al click dei pulsanti */
const cardGen = (ev, query) => {
  ev.preventDefault();
  cardSpace.innerHTML = "";
  const target = ev.target.innerText;
  if (target === "Load Images") {
    const url = "https://api.pexels.com/v1/search?query=dog";
    get(url);
  } else if (target === "Load Secondary Images") {
    const url = "https://api.pexels.com/v1/search?query=cat";
    get(url);
  } else {
    const url = "https://api.pexels.com/v1/search?query=" + query;
    get(url);
  }
};

const formHandler = event => {
  const query = document.getElementById("search").value;
  cardGen(event, query);
};

imgBtn1.onclick = cardGen;
imgBtn2.onclick = cardGen;
form.onsubmit = formHandler;
