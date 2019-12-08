/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sectionHeadings = [];
let sectionIds = [];
let navIds = [];
let sections = [];
const NAV_CLASS_NAME_ACTIVE = 'menu__link active';
const NAV_CLASS_NAME = 'menu__link';
const ELEMENT_ENTER_VIEW_THRESHOLD = 300;
const ELEMENT_LEFT_VIEW_THRESHOLD = 200;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description Get the details from the "Section" tag in the HTML page
 */
function getSectionDetails() {
    sections = document.querySelectorAll('section');
    for (let i = 0; i < sections.length; i ++){
        sectionHeadings.push(sections[i].dataset.navTitle);
        navIds.push(sections[i].dataset.navId);
        sectionIds.push(sections[i].id);
    }
    console.log(sectionHeadings);
}

/**
 * @description Check if the element has entered into the view
 * @param {object} element - The element being evaluated
*/
function hasElementEnteredView(element) {
    const rect = element.getBoundingClientRect();
    const elemTop = rect.top;
    // If the top of the element is between 0 and the threshold, return true, otherwise return false
    return (elemTop >= 0) && (elemTop <= ELEMENT_ENTER_VIEW_THRESHOLD);
}

/**
 * @description Check if the element has left the view
 * @param {object} element - The element being evaluated
 */
function hasElementLeftView(element) {
    const rect = element.getBoundingClientRect();
    const elemBottom = rect.bottom;
    const windowHeight =  window.innerHeight;
    // If the top of the element is between the height of the window and the threshold, return true, otherwise return false
    return elemBottom <= ELEMENT_LEFT_VIEW_THRESHOLD || elemBottom > windowHeight;
}

/**
 * @description Check whether each section is in view
 */
function checkSectionsInView(){
    for (let section of sections){
        if (hasElementEnteredView(section)){
            setActive(section);
        } else if (hasElementLeftView(section)){
            setInactive(section);
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
window.addEventListener("load", function(){
    // build the nav
    buildNavigation();
});

window.addEventListener('scroll', function(e) {
    // Add class 'active' to section when near top of viewport
    checkSectionsInView();
});

// Scroll to anchor ID using scrollTO event
function onLinkClicked(element) {
    const section = document.querySelector('#'+element.dataset.section);
    checkSectionsInView();
    scrollTO(section);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNavigation() {
    getSectionDetails();
    const nav = document.querySelector('#navbar__list');
    let navigation = '';
    for (let i = 0; i < sectionHeadings.length; i ++){
        // During initialisation, for the first nav item, use active state. For others, use standard state.
        navigation += '<li id="'+navIds[i]+'" class="'+ (i === 0 ? NAV_CLASS_NAME_ACTIVE : NAV_CLASS_NAME) +'" onclick="onLinkClicked(this)" data-section="'+sectionIds[i]+'">'+sectionHeadings[i]+'</li>'
    }
    nav.innerHTML = navigation;
}

// Scroll to section on link click
function scrollTO(section) {
    section.scrollIntoView();
}

// Set sections as active
function setActive(section) {
    // Add "active" state to the section
    section.classList.add('active');
    const navId = section.dataset.navId;
    // Add "active" state to the nav item
    document.querySelector('#'+navId).classList.add('active')
}

// Remove section's active status
function setInactive(section) {
    // Remove "active" state to the section
    section.classList.remove('active');
    const navId = section.dataset.navId;
    // Remove "active" state to the nav item
    document.querySelector('#'+navId).classList.remove('active')
}

