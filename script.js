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
    
    title.classList.add("fade");
    title.innerHTML = data[0].title;
    pic.setAttribute("src", data[0].hdurl, expl);
    
    pic.onload = () => {
        pic.classList.add("grow");
        expl.style.display = "block";
        expl.classList.add("fade");
        typewrite(data[0].explanation, expl);
        wrapper.classList.remove("glow");

        if (overflow(wrapper) <= 3) {
            alert('O elemento está transbordando!');
            wrapper.style.scale = 0.95;
        } else if (overflow(wrapper) < 0) {
            alert('O elemento está transbordando muito!');
            wrapper.style.scale = 0.8;
        }
    }
    
    pic.onerror = () => {
        pic.style.display = "none";
        expl.style.display = "block";
        expl.style.maxWidth = "100%";
        wrapper.innerHTML += "Error loading the image, sorry :c";
        wrapper.classList.remove("glow");
    }
}

function overflow(el) {
    return (document.body.scrollHeight - el.scrollHeight);
}

function typewrite(txt, dest) {
    let i = 0;

    const interval = setInterval(() => {
        if (i < txt.length) {
            dest.innerHTML += txt[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

function error() {
    const wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = "Error loading :c<br>Try refreshing the page.";
}
