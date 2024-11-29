document.addEventListener("DOMContentLoaded", getData);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#changeImg").addEventListener("click", () => {
        location.reload();
    });
});

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
    const showExpl = () => {
        expl.style.display = "block";
        expl.classList.add("fade");
        wrapper.classList.remove("glow");
        expl.innerHTML = data[0].explanation; // O typeriter por algum motivo não funciona no onerror :c, ele recebe tudo certinho, até escreve no console mas não insere na tela, inserir assim de uma vez funciona
        // typewrite(data[0].explanation, expl);   
    }

    title.classList.add("fade");
    title.innerHTML = data[0].title;
    pic.setAttribute("src", data[0].hdurl, expl);
    
    pic.onload = () => {
        showExpl();
        pic.classList.add("grow");
        if (overflow(wrapper) <= 3) {
            wrapper.style.scale = 0.95;
        } else if (overflow(wrapper) < 0) {
            wrapper.style.scale = 0.8;
        }
    }
    
    pic.onerror = () => {
        showExpl();
        pic.style.display = "none";
        expl.style.maxWidth = "100%";
        wrapper.innerHTML += "Error loading the image, sorry :c";
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
