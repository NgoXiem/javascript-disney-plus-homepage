const recommend = document.querySelector(".recommend");
const newMovies = document.querySelector(".new");
const originals = document.querySelector(".originals");
const trending = document.querySelector(".trending");

/**********Fetch Data and display List of movie on the UI *************/

const myFunc = (node, type) => {
  const list = movies.filter((movie) => movie.type === type);
  list.map((movie) => {
    html = `
    <a href="/html/about.html">
        <img src=${movie.cardImg} alt="movie.title">
    </a>
        `;
    node.innerHTML += html;
  });
};

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/movies");
  const data = await response.json();
  return data;
};

const movies = [];

fetchData()
  .then((data) => {
    for (let i = 1; i < 17; i++) {
      movies.push(data[i]);
    }
    myFunc(recommend, "recommend");
    myFunc(newMovies, "new");
    myFunc(originals, "original");
    myFunc(trending, "trending");
  })
  .catch((err) => console.log(err));

//carousel autoplay

const carousel = document.querySelector(".carousel-container");
const images = document.querySelectorAll(".carousel-image img");
const dots = document.querySelectorAll(".dot span");
let counter = 0;
let repeater;

const autoplay = () => {
  repeater = setInterval(() => {
    counter++;
    if (counter > images.length - 1) {
      counter = 0;
    }
    images.forEach((image) => image.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    images[counter].classList.add("active");
    dots[counter].classList.add("active");
  }, 3000);
};

autoplay();

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(repeater);

    images.forEach((image) => image.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    images[index].classList.add("active");
    dot.classList.add("active");
    counter = index;
    autoplay();
  });
});

// mouseover and mouseleave

images.forEach((image) => {
  image.addEventListener("mouseover", () => {
    clearInterval(repeater);
  });

  image.addEventListener("mouseleave", () => {
    autoplay();
  });
});

// set dynamic height
const img = document.querySelector(".carousel-image img");
const dot = document.querySelector(".dot");

window.addEventListener("load", () => {
  carousel.style.height = `${img.clientHeight}px`;
  dot.style.minWidth = img.clientWidth;
});

// play videos in buttons

const videos = document.querySelectorAll("video");
videos.forEach((video) => {
  video.addEventListener("mouseover", () => {
    video.play();
  });
  video.addEventListener("mouseleave", () => video.pause());
});
