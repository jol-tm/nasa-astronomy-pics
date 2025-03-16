document.querySelector("#changeContent").addEventListener("click", changeContent);

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
        expl.classList.add("expand");
        if ((data[0].explanation).length > 1150 && window.innerHeight <= 650) {
            wrapper.style.scale = .9;
        } else {
            wrapper.style.scale = 1;
        }
        expl.innerHTML = data[0].explanation;
    }

    title.classList.add("fade");
    title.innerHTML = data[0].title;
    pic.setAttribute("src", data[0].hdurl);

    pic.onload = () => {
        showExpl();
        pic.classList.add("grow");
    }
    
    pic.onerror = () => {
        showExpl();
        expl.style.maxWidth = "100%";
        pic.style.display = "none";
        wrapper.innerHTML += "Image unavailable :c";
    }
}

function changeContent() {
    document.querySelector("#wrapper").innerHTML = `
        <h1 id="title">Loading<br>...</h1>
        <div class="box">
            <img id="pic" src="media/loader.gif">
            <p id="expl"></p>
        </div>
    `;
    getData();
}

function showHideLangs() {
    const langs = document.querySelector("#langs");
    const iconClose = document.querySelector("#closeIcon");

    if (langs.style.opacity == 0) {
        langs.style.height = "9rem";
        langs.style.opacity = 1;
        langs.style.pointerEvents = "all";
        iconClose.style.display = "inline";
    } else {
        langs.style.height = 0;
        langs.style.opacity = 0;
        langs.style.pointerEvents = "none";
        iconClose.style.display = "none";
    }
}

function error() {
    const wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = "Error loading :c";
}

getData();