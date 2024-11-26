document.addEventListener("DOMContentLoaded", getData);

async function getData() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEM_KEY&count=1")
    .then(Response => Response.json())
    .then(displayData)
    .catch(error);
}

function displayData(data) {
    const wrapper = document.querySelector("#wrapper");
    const title = document.querySelector("#title");
    const expl = document.querySelector("#expl");
    const pic = document.querySelector("#pic");

    title.innerHTML = data[0].title;
    pic.setAttribute("src", data[0].url);
    
    pic.onload = () => {
        expl.innerHTML = data[0].explanation;
        wrapper.classList.remove("glow");
    }
}

function error() {
    const wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = "Error loading :c<br>Try refreshing the page,<br>but the API may be unavailable.";
}
