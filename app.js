let input = document.querySelector("input");
let btn = document.querySelector(".search-btn");
let info = document.querySelector(".info-container")
let imgContainer = document.querySelector(".img-container");
let userRepo = document.querySelector(".user-repo");
let body = document.querySelector("body");

let url = "https://api.github.com/users/";

btn.addEventListener("click", ()=>{
    console.log("btn was clicked");
    let username = input.value;
    userRepo.innerHTML = "";
    getInfo(username);
})


function getInfo(username){

    fetch(url+username).then((res)=>{
        if(!res.ok){
            throw new Error("user not found");
        }
        console.dir(res);
        console.log("status : " + res.status);
        return res.json();
    }).then((res)=>{
        let data = res
        console.log(res);
        addInfo(data);
    }).catch((err)=>{
        console.log(err);
        info.classList.add("hide");
        body.classList.add("danger");
        setTimeout(()=>{
            body.classList.remove("danger");
            alert(err);
        }, 500);
    })
}


function addImg(avatarSrc){

    let img = document.querySelector("#profile-img");
    img.setAttribute("src", avatarSrc);
    img.classList.add("img-styling");
}

function addUserInfo(data){
    let name = document.querySelector("#name");
    let username = document.querySelector("#username");
    let location = document.querySelector("#location");
    let bio = document.querySelector("#bio");
    let userid = document.querySelector("#userid");
    let repo = document.querySelector("#repo");
    let followers = document.querySelector("#followers");

    name.innerText = data.name;
    if(name.innerText === ""){
        name.innerText = "NOT FOUND";
    }
    username.innerText = data.login;
    location.innerText = data.location;
    if(location.innerText === ""){
        location.innerText = "NOT FOUND";
    }
    repo.innerText = data.public_repos;
    bio.innerText = data.bio;
    if(bio.innerText === ""){
        bio.innerText = "NOT FOUND";
    }
    userid.innerText = data.id;
    followers.innerText = data.followers;

}

async function fetchRepo(url){
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

function addRepo(data){

    for(let i=0; i<data.length; i++){
        console.log(data[i]);

        let name = document.createElement("h2");
        let lang = document.createElement("p");
        let link = document.createElement("a");

        let box = document.createElement("div");

        name.innerText = data[i].name;
        lang.innerText = data[i].language;
        link.innerText = data[i].name;
        link.setAttribute("href", `${data[i].html_url}`);
        link.setAttribute("target", "_blank");

        box.appendChild(name);
        box.appendChild(lang);
        box.appendChild(link);

        box.classList.add("repo-styling");
        userRepo.appendChild(box);

    }
}

async function addInfo(data){

    info.classList.remove("hide");
    addImg(data.avatar_url);
    addUserInfo(data);
    let repo = await fetchRepo(data.repos_url);
    addRepo(repo);
}
