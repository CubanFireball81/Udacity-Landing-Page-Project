

// Ensure page has been loaded before running functions.
document.addEventListener('DOMContentLoaded', () => {
    // collect sections.
    const sections = document.querySelectorAll('section');
    // build nav.
    navigation(sections);
    // add menu items click event listener
    addMenuEventListener();
    activeSection();
})

// build the nav menu from sections in html using for..of loop.
const navigation = (sections => {
    for (const section of sections) {
        const sectionTitle = section.dataset.nav;
        createNavigation(sectionTitle);
    }
});

// add eventlistener to nav links, then smoothly scroll to that section.
const addMenuEventListener = () => {
    const menuLists = document.querySelectorAll("li");
    for (const menuList of menuLists) {

    // smoothly navigate to proper section when nav link is clicked.
    menuList.addEventListener("click", (e) => {
      // prevent eventListener's default action
      e.preventDefault();
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

// set a timer to track time
let timer = null;

//get the nav element's class so it can be targeted for hiding or showing the navbar
const header = document.getElementsByClassName('page__header')[0];

// function to check if the user is scrolling the page of not, if not then hide nav bar after 1.5 seconds. Also, clear the timer after scroll events so timer value doesn't keep increasing.
function isScrolling() {
  if(timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    header.style.display = 'none';
  }, 1500);
}

// Add class 'active' to section when it is near top of viewport
const activeSection = () => {
  const sections = document.querySelectorAll("section");
  let linkName;
  window.addEventListener("scroll", () => {
    for (const section of sections) {
      const box = section.getBoundingClientRect();
      if (box.top < window.innerHeight/2 && box.bottom >= 0) {
        removeActiveClass();

        // Get's name to reference add/remove class active to/from
        linkName = section.dataset.nav;
        addActiveClass(section, linkName);
      }
    }
  });
};

// Add active class to section and li elements
const addActiveClass = (section, linkName) => {
  section.classList.add(`section-active-class`);

  // apply active class to link
  const link = document.getElementById(linkName);
  link.classList.add("link-active-class");
};

// Remove active class from section and li elements
const removeActiveClass = () => {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll("li");
  for (const section of sections) {
    section.classList.remove(`section-active-class`);
  }
  for (const link of links) {
    link.classList.remove(`link-active-class`);
  }
};

// Hides navbar if user is not scrolling using isScrolling function. Defaults to false so navbar is showing at page load and until first scroll event.
document.addEventListener('scroll', () => {
  isScrolling();
}, false);

// Displays navbar when user scrolls the page
document.addEventListener('scroll', () => {
  header.style.display = 'block';
});

// Bring in the hamburger and navbar items so JS can listen to and toggle properties
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#navbar__list');

// Add hamburger click event listener
hamburger.addEventListener('click', function() {
  if(hamburger.classList == 'active') {
    closeMenu();
  } else {
    openMenu();
  }
});

// Toggle active classes to hamburger and openMenu
function openMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Remove active classes when hamburger close is clicked
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}