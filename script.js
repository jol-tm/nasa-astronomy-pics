document.addEventListener("DOMContentLoaded", getData);

async function getData() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=9bdO3AvcQIGxbVDASdDndAZQZRUEYUgjh0PgSfuh&count=1")
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
    pic.setAttribute("src", data[0].hdurl);
    
    pic.onload = () => {
        expl.innerHTML = data[0].explanation;
        expl.style.display = "block";
        wrapper.classList.remove("glow");
    }
}

function error() {
    const wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = "Error loading :c<br>Try refreshing the page.";
}
