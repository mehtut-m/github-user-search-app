console.log("App Started...")

let myName ='octocat'

fetch( 'https://api.github.com/users/'+myName)
    .then(result => result.json())
    .then(element => updateInfo(element));

 function updateInfo(obj) {
    // update profile info
    document.querySelector('.profile-title').textContent = obj.name;
    document.querySelector('.profile-image').src = obj.avatar_url;

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
    updateContactInfo('.website-container', obj.blog, true);
    updateContactInfo('.twitter-container', obj.twitter_username);
    updateContactInfo('.company-container', obj.company);
 }   
 function updateContactInfo(targetElement, value, href = undefined) {
    const notFound = "Not Available";
    let domElement = document.querySelector(targetElement)
    if(href != undefined) {
        domElement.querySelector('.contact-description').href = value;
    }
    console.log(domElement);
    if (value != null) {
        domElement.querySelector('.contact-description').textContent = value;
        domElement.classList.remove('not-found');
    }
    else {
        domElement.querySelector('.contact-description').textContent = notFound;
        domElement.classList.add('not-found');
    }
 }