let addToy = false;

let dataList = [];

const toyCollection = document.getElementById("toy-collection");
const toyForm = document.querySelector(".add-toy-form");

// fetch data from the database
const fetchData = async () => {
  const response = await fetch("http://localhost:3000/toys");

  dataList = await response.json();

  dataList.forEach((toy) => handleToyData(toy));
};
e;
// handle toy data

// creates a div that has a className of card and append every details into it

// append the div to the toyCollection div

const handleToyData = (data) => {
  const toyDiv = document.createElement("div");
  toyDiv.className = "card";
  const toyName = document.createElement("h2");
  toyName.textContent = data.name;
  const toyImage = document.createElement("img");
  toyImage.className = "toy-avatar";
  toyImage.src = data.image;
  const likesEl = document.createElement("p");
  likesEl.textContent = `${data.likes} likes`;
  const likesBtn = document.createElement("button");
  likesBtn.className = "like-btn";
  likesBtn.textContent = "Like";
  likesBtn.setAttribute("id", data.id);
  likesBtn.addEventListener("click", () => {
    PatchLikesData(data.id);
    // addToyData(name, image);
  });

  toyDiv.appendChild(toyName);
  toyDiv.appendChild(toyImage);
  toyDiv.appendChild(likesEl);
  toyDiv.appendChild(likesBtn);

  toyCollection.append(toyDiv);
};

// add toy data passed in from the form

const addToyData = async (name, image) => {
  const config = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  await fetch("http://localhost:3000/toys", config);
  // const data = await response.json();
};

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const image = e.target.image.value;

  addToyData(name, image);
});

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const PatchLikesData = async (id) => {
  const currData = dataList.find((toy) => toy.id === id);
  const config = {
    method: "PATCH",
    body: JSON.stringify({
      likes: currData.likes + 1,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  await fetch(`http://localhost:3000/toys/${id}`, config);
};

// setTimeout(() => {
//   const likesButton = document.querySelectorAll(".like-btn");

//   console.log(likesButton);
// }, 5000);

// likesButton.addEventListener("click", () => {
//   console.log("LIKED");
// });

fetchData();
