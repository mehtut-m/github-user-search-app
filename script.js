document.addEventListener('DOMContentLoaded', () => {

console.log("App Started...")

let urlGithub = 'https://api.github.com/users/';
let initialSearch ='octocat'

let form = document.querySelector('.search-form');
const toggleSwitch = document.querySelector('.theme-container');

toggleSwitch.addEventListener('click', switchTheme);

retrievedAPI(urlGithub, initialSearch);

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let keyValid = getKeyword();
    
    if(keyValid) {
        retrievedAPI(urlGithub, keyValid);
    }

});

function getKeyword () {
    let input = document.querySelector('.github-user').value;
    if(input) {
        return document.querySelector('.github-user').value;
    }
    else {
        alert("Empty");
        return false;
    }
}

function retrievedAPI (url,key) {
    fetch(url+key)
        .then((response) => {
            if (response.status == 404) {
                resultNotFound();
                return ;    
            }
            else if (response.status != 200) {
                console.log('Looks like there was a proble. Status Code: ' + response.status);
                return ;
            }
            response.json()
            .then((element) => {
                console.log(element)
                updateInfo(element)
            })
        })
        .catch(err => console.log('Fetch Error :-S' , err))
}

function updateInfo(obj) {
    // update profile info
    document.querySelector('.profile-title').textContent = obj.name;
    document.querySelector('.profile-image').src = obj.avatar_url;
    document.querySelector('.join-on').textContent;
    updateJoinDate('.join-on', obj.created_at);

    document.querySelector('.github-link').textContent = `@${obj.login}`;
    document.querySelector('.github-link').href = obj.html_url;
    //update bio
    document.querySelector('.bio').textContent = obj.bio;
    // update the repo status
    document.querySelector('.repo-count').textContent = obj.public_repos;
    document.querySelector('.follower-count').textContent = obj.followers;
    document.querySelector('.following-count').textContent = obj.following;
    
    //update the contact info 
    updateContactInfo('.address-container', obj.location);
    updateLink('.website-container', obj.blog);
    updateContactInfo('.twitter-container', obj.twitter_username);
    updateContactInfo('.company-container', obj.company);
}   

function updateContactInfo(targetElement, value) {
    const notFound = "Not Available";
    let domElement = document.querySelector(targetElement)

    if (value != null) {
        domElement.querySelector('.contact-description').textContent = value;
        domElement.classList.remove('not-found');
    }
    else {
        domElement.querySelector('.contact-description').textContent = notFound;
        domElement.classList.add('not-found');
    }
}
function updateJoinDate (targetElement, dateData) {
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    let domTarget = document.querySelector(targetElement);
    //split the string in to array
    dateData = dateData.slice(0,10).split('-');
    //update the month
    domTarget.textContent = `Joined ${dateData[2]} ${months[dateData[1] - 1]} ${dateData[0]}`;
}

function updateLink(targetElement, value) {
    const notFound = "Not Available";
    let domElement = document.querySelector(targetElement)
    
    if (value != null && value != "") {
        domElement.querySelector('.contact-description').textContent = value;
        domElement.querySelector('.contact-description').href = value;
        domElement.classList.remove('not-found');
    }
    else {
        domElement.querySelector('.contact-description').textContent = notFound;
        domElement.classList.add('not-found');
    }
 }
 function resultNotFound() {
    const errorDisplay = document.querySelector('.error-message');
    errorDisplay.textContent = 'No results';
    errorDisplay.style.display = "block";

 }
 function switchTheme() {
    let currentTheme = toggleSwitch.querySelector('p');
    let iconSwitch = toggleSwitch.querySelector('object');
    let iconImg = document.querySelector('.theme-icon');
    
    
    if(currentTheme.textContent == 'Dark') {
        currentTheme.textContent = 'Light';
        document.documentElement.setAttribute('data-theme', 'dark');
        iconImg.style.content = 'url(assets/icon-sun.svg)';
        console.log(document.querySelector('.theme-icon'))
     }
     else {
         currentTheme.textContent = 'Dark';
         document.documentElement.setAttribute('data-theme', 'light');
         iconImg.style.content = 'url(assets/icon-moon.svg)';
         console.log(document.querySelector('.theme-icon'))


        //  iconSwitch.data = 'assets/icon-moon.svg';
     }
 }
})