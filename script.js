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
    expl.innerHTML = data[0].explanation;
    pic.setAttribute("src", data[0].hdurl);
    
    
    pic.onload = () => {
        pic.classList.add("grow");
        expl.style.display = "block";
        wrapper.classList.remove("glow");

        console.log(wrapper.scrollHeight  + ', '+ document.body.scrollHeight);

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

function error() {
    const wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = "Error loading :c<br>Try refreshing the page.";
}
