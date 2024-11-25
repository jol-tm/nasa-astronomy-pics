// document.addEventListener("DOMContentLoaded", getData);

async function getData() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1")
    .then(Response => Response.json())
    .then(displayData);
}

function displayData(data) {
    const title = document.querySelector("#title");
    const expl = document.querySelector("#expl");
    const pic = document.querySelector("#pic");

    title.innerHTML = data[0].title;
    expl.innerHTML = data[0].explanation;
    pic.setAttribute("src", data[0].hdurl);
}
