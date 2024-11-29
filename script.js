getData();
document.querySelector("#changeImg").addEventListener("click", changeContent);

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

    wrapper.classList.add("glow");
    title.classList.add("fade");
    title.innerHTML = data[0].title;
    pic.setAttribute("src", data[0].hdurl);

    pic.onload = () => {
        showExpl();
        pic.classList.add("grow");
        wrapper.classList.remove("glow");
    }
    
    pic.onerror = () => {
        showExpl();
        expl.style.maxWidth = "100%";
        pic.style.display = "none";
        wrapper.innerHTML += "Error loading the image, sorry :c";
        wrapper.classList.remove("glow");
    }
}

function changeContent() {
    document.querySelector("#wrapper").innerHTML = `
        <h1 id="title">Loading<br>...</h1>
        <div class="box">
            <img id="pic" src="loader.gif">
            <p id="expl"></p>
        </div>
    `;
    getData();
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