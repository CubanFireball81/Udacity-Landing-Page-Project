// Ensure page has been loaded before running functions.
document.addEventListener('DOMContentLoaded', () => {
    // collect sections.
    const sections = document.querySelectorAll('section');
    // build nav.
    navigation(sections);
    // add menu items click event listener
    addMenuEventListener();
})

// build the nav menu from sections in html using for..of loop.
const navigation = (sections => {
    for (const section of sections) {
        const sectionTitle = section.dataset.nav;
        createNavigation(sectionTitle);
    }
})

// add eventlistener to nav links, then smoothly scroll to that section.
const addMenuEventListener = () => {
    const menuLists = document.querySelectorAll("li");
    for (const menuList of menuLists) {

    // smoothly navigate to proper section when nav link is clicked.
    menuList.addEventListener("click", () => {
        const section = document.querySelector(`[data-nav='${menuList.id}']`);
        if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        }
    });
    }
};

// create navbar by adding link, anchor, and sectionName
const createNavigation = (sectionName) => {

  // create a list item.
    let navBar = document.createElement("li");
    navBar.setAttribute("id", `${sectionName}`);

  // create an anchor tag.
    let navBarContent = document.createElement(`a`);

  // add name to navigation bar.
    let newContent = document.createTextNode(sectionName);
    navBarContent.appendChild(newContent);

  // append new li child to navigation list.
    navBar.appendChild(navBarContent);

  // grab navigation list so new items can be added. 
    let currentDiv = document.getElementById("navbar__list");
    currentDiv.appendChild(navBar);
};