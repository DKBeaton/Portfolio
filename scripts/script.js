// Variables
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navigationLinks = document.querySelectorAll('.nav-item a');

// Navigation event listener
menuToggle.addEventListener('click', function () {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

// Check if element is in viewport
function isElementInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  return (vertInView && horInView);
}

// Add animation
function checkAnimation() {

  // Get the animation element
  const animLeft = document.querySelectorAll('.line-left');
  const animRight = document.querySelectorAll('.line-right');

  animLeft.forEach(function(item) {
    if (item.classList.contains('start')) return;

    if (isElementInViewport(item)) {
      item.classList.add('start');
    }
  });

  animRight.forEach(function(item) {
    if (item.classList.contains('start')) return;

    if (isElementInViewport(item)) {
      item.classList.add('start');
    }
  });
}

function checkNavigation() {

  // Check if in mobile mode
  if (window.innerWidth < 800) return;

  // Get element variables
  const port = document.getElementById('projects');
  const navitem = document.querySelectorAll('.nav-item a');
  
  // Get the size and position of portfolio section
  const portRect = port.getBoundingClientRect();

  // Check each navigation item if it enters the portfolio section
  navitem.forEach(function(item) {

    // Get the size and position of the item
    const itemRect = item.getBoundingClientRect();

    // Check if the items position and add or remove the black class
    if (itemRect.top + itemRect.height < portRect.top) {
      item.classList.remove('black');
    } else if (itemRect.top > portRect.top + portRect.height) {
      item.classList.remove('black');
    } else {
      item.classList.add('black');
    }
  });
}

// Check which section we are viewing
function viewingSection() {
  const viewingSection = Array.from(sections)
    .reverse()
    .find((sections) => sections.getBoundingClientRect().top <= 80);

  if (viewingSection) {
    Array.from(navigationLinks).forEach((navigationLinks) => {
      if (navigationLinks.getAttribute('href') === `#${viewingSection.getAttribute('id')}`) {
        navigationLinks.classList.add('active');
      } else {
        navigationLinks.classList.remove('active');
      }
    });
  }
}

// Capture scroll events
window.addEventListener('scroll', function() {

  // Check animation
  checkAnimation();

  // Check navigation
  checkNavigation();

  // Check which section we are viewing
  viewingSection();
});

