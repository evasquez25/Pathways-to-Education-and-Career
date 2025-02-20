// DARK MODE
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode-body");

    // Nav bar
    document.querySelector("nav").classList.toggle("dark-mode-nav");

    // Header
    document.querySelector(".header-container").classList.toggle("dark-mode-header");

    // Sections
    document.querySelectorAll("section").forEach(section => {
        section.classList.toggle("dark-mode-section");
    });

    // Footer
    document.querySelector("footer").classList.toggle("dark-mode-footer");
}

themeButton.addEventListener("click", toggleDarkMode);


// PETITION SIGNING
let signNowButton = document.getElementById("sign-now-button");
let count = 3;

const addSignature = (person) => {
    if (person.name && person.hometown && person.email) {
        const newSignature = document.createElement("p");
        newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`

        document.getElementsByClassName("signatures")[0].appendChild(newSignature);

        document.getElementById("sign-petition").reset();
        
        // Update counter logic
        const counterText = document.getElementById("counter").remove();

        count = count + 1;

        const updateCounter = document.createElement("p");
        updateCounter.id = "counter"
        updateCounter.innerText = "🖊️ " + count + " people have signed this petition and support this cause.";
        document.getElementsByClassName("signatures")[0].appendChild(updateCounter);
    } else {
        alert("Please fill in your name, hometown, and email");
    }

    toggleModal(person);
}

const validateForm = () => {
    let containsErrors = false;
    var petitionInputs = document.getElementById("sign-petition").elements;
    let person = {
        name: petitionInputs[0].value,
        hometown: petitionInputs[1].value,
        email: petitionInputs[2].value,
    }

    let email = document.getElementById("email");

    for (let i = 0; i < petitionInputs.length; i++) {
        if (petitionInputs[i].value.length < 2) {
            containsErrors = true;
            petitionInputs[i].classList.add("error");
        } else {
            petitionInputs[i].classList.remove("error");
        }
    }

    // Check for valid email input
    if (!person.email.includes(".com")) {
        containsErrors = true;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }

    if (containsErrors == false) {
        addSignature(person);
    }
}
  
signNowButton.addEventListener('click', validateForm);


// ANIMATIONS
let animation = {
revealDistance: 100,
initialOpacity: 0,
transitionDelay: 0,
transitionDuration: "2s",
transitionProperty: "all",
transitionTimingFunction: "ease"
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;

        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            /* add the active class to the revealableContainer's classlist */
            revealableContainers[i].classList.add("active");
        } else {
            /* remove the active class to the revealableContainer's classlist */
            revealableContainers[i].classList.remove("active");
        }
    }
}

window.addEventListener('scroll', reveal);


let reduceMotionBtn = document.getElementById("reduce-motion-button");

const reduceMotion = () => {
    document.body.classList.toggle("reduced-motion");
};

reduceMotionBtn.addEventListener("click", reduceMotion);


// MODAL INTEGRATION
let modal = document.getElementById("thanks-modal");
let modalContent = document.getElementById("thanks-modal-content");

const toggleModal = (person) => {
    let intervalId = setInterval(scaleImage, 500);

    modal.style.display = "flex";
    modalContent.innerText = `Thanks you so much ${person.name}! ${person.hometown} represent!`;

    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 5000)


}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-img");

const scaleImage = () => {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`
}

let closeBtn = document.getElementById("modal-close-btn");

const closeModal = () => {
    modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);