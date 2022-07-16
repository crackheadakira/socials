const socialLink = document.querySelector('#socialLink');
const profile = document.querySelector('#profile');
const title = document.querySelector('#title');
const backgroundImg = document.querySelector('#main').style;
const links = document.querySelector('#links');

getJSON().then(data => {

    backgroundImg.setProperty('--background', `url(${data.user.background})`);
    profile.src = data.user.profile;
    title.textContent = data.user.name;

    for (social in data.socials) {
        let items = Object.values(data.socials[social]);
        if (social === "discord") {
            const discordDiv = createDiscord(items);
            discordDiv.addEventListener('click', (e) => {
                navigator.clipboard.writeText(discordDiv.textContent);

                const notification = document.querySelector('#discordPopUp');
                notification.style.opacity = "100";
                setTimeout(function() {
                    notification.style.opacity = "0";
                }, 1000)
            });
            links.parentNode.insertBefore(discordDiv, links.nextSibling);
            break;
        }
        if (items[2] <= 0) { break }
        const a = createAElement(items);
        a.appendChild(createImgElement(items, social));
        socialLink.appendChild(a);
    }
})



async function getJSON() {
    const requestURL = './socials.json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    return response.json();
}

function createAElement(data) {
    const a = document.createElement("a");
    a.href = data[1];
    a.target = "_blank";
    return a;
}

function createImgElement(data, extraInfo = "") {
    const img = document.createElement("img");
    img.src = data[2];
    img.alt = `${extraInfo} - ${data[0]}`
    img.classList.add("socialLink");
    return img;
}

function createDiscord(data) {
    const discordDiv = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement('p');
    discordDiv.id = "discord";
    p.textContent = data[0];
    img.src = data[1];
    img.alt = `discord - ${data[0]}`;
    img.classList.add('socialLink');
    discordDiv.appendChild(img)
    discordDiv.appendChild(p);
    return discordDiv;
}