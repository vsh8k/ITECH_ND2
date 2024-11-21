console.log("Bikes Loaded");
let buttons = [];
function addToCartMessage(productName) {
  alert(productName + " has been added to your cart!");
}
document.querySelectorAll(".cart-btn").forEach((button, index) => {
  buttons.push(button);
  console.log(button);
  button.addEventListener("click", function (event) {
    event.preventDefault();
    if(document.querySelectorAll(".listing label").length == 0) {
      addToCartMessage(document.querySelectorAll(".modal-title")[index].innerText);
    }
    else {
      const productName =
      document.querySelectorAll(".listing label")[index * 2].innerText;
      addToCartMessage(productName);
    }
  });
});
//Loader
function isExternalReferrer() {
  const referrer = document.referrer;
  console.log(referrer.includes(window.location.hostname));
  return !referrer.includes(window.location.hostname);
}

const loaderContainer = document.querySelector(".loader-container");
const content = document.querySelector(".content");

function fadeOutLoader() {
  let opacity = 1;
  const fadeInterval = setInterval(() => {
    opacity -= 0.05;
    loaderContainer.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeInterval);
      loaderContainer.style.display = "none";
      fadeInContent();
    }
  }, 50);
}

function fadeInContent() {
  content.style.visibility = "visible";
  content.style.display = "flex";
  let opacity = 0;
  const fadeInterval = setInterval(() => {
    opacity += 0.05;
    content.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(fadeInterval);
    }
  }, 50);
}

function switchContent() {
  content.style.visibility = "visible";
  content.style.display = "flex";
  content.style.opacity = 1;
}

if (isExternalReferrer()) {
  loaderContainer.style.display = "flex";
  setTimeout(fadeOutLoader, 500);
} else {
  switchContent();
}
