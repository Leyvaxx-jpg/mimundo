const messages = [
    "Te amo muchisimo ❤️",
    "Gracias por estar en mi vida ❤️",
    "Eres mi persona favorita 🫶",
    "Nunca te dejare de amar ❤️",
    "Pegame pero no me dejes🥰",
    "Eres mi vida entera 💞",
    "Siempre te voy a amar ❤️",
    "Eres un solecito🥰 ",
    "Tu sonrisa me ilumina 🫶",
    "Cada momento contigo es magico 💞",
    "Eres increible🥰 ",
    "Mi niña hermosa ❤️"
];

const heartSymbols = ["❤", "💗", "💖", "💘", "💞", "💓"];
const randomBetween = (min, max) => Math.random() * (max - min) + min;

function createtextBubble() {
    const bubble = document.createElement("div");
    bubble.className = "text-bubble";
    bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

    const left = randomBetween(5, 75);
    const top = randomBetween(10, 80);
    const size = randomBetween(16, 24);
    const duration = randomBetween(3, 4.5);

    bubble.style.left = left + "vw";
    bubble.style.top = top + "vh";
    bubble.style.fontSize = size + "px";
    bubble.style.animationDuration = duration + "s";

    const container = document.getElementById("bubble-text");
    if (container) {
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), duration * 1000);
    }
}

function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    const left = randomBetween(2, 98);
    const size = randomBetween(18, 32);
    const duration = randomBetween(6, 10);
    const drift = randomBetween(-50, 50);

    heart.style.left = left + "%";
    heart.style.fontSize = size + "px";
    heart.style.setProperty("--drift", drift + "px");
    heart.style.animationDuration = duration + "s";

    const container = document.getElementById("bubble-text");
    if (container) {
        container.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }
}

const lightbox = document.getElementById("photo-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxMessage = document.querySelector(".lightbox-message");
const closeLightboxButton = document.querySelector(".lightbox-close");
const lightboxPreviousButton = document.getElementById("lightbox-previous");
const lightboxNextButton = document.getElementById("lightbox-next");
const memoryBook = document.querySelector(".memory-book");
const galleryImages = [...document.querySelectorAll(".photo-gallery img")];
const previousPageButton = document.getElementById("previous-page");
const nextPageButton = document.getElementById("next-page");
const pageCounter = document.getElementById("page-counter");

let currentSpread = 0;
let currentLightboxIndex = 0;
const totalSpreads = galleryImages.length;

function showSpread() {
    galleryImages.forEach((image, index) => {
        image.style.display = index === currentSpread ? "block" : "none";
    });

    if (pageCounter) {
        pageCounter.textContent = `${currentSpread + 1} / ${totalSpreads}`;
    }
    if (previousPageButton) previousPageButton.disabled = currentSpread === 0;
    if (nextPageButton) nextPageButton.disabled = currentSpread === totalSpreads - 1;
}

function showLightboxImage(index) {
    if (!lightboxImage || !lightboxMessage || !lightbox || galleryImages.length === 0) return;

    currentLightboxIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[currentLightboxIndex];

    lightboxImage.src = image.src;
    lightboxMessage.textContent = image.dataset.message || "Te amo ❤️";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
}

if (memoryBook) {
    const cover = memoryBook.querySelector(".book-cover");
    if (cover) {
        cover.addEventListener("click", () => {
            memoryBook.classList.add("is-open");
        });
    }
}

galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
        showLightboxImage(galleryImages.indexOf(image));
    });
});

if (previousPageButton) {
    previousPageButton.addEventListener("click", () => {
        if (currentSpread > 0) {
            currentSpread -= 1;
            showSpread();
        }
    });
}

if (nextPageButton) {
    nextPageButton.addEventListener("click", () => {
        if (currentSpread < totalSpreads - 1) {
            currentSpread += 1;
            showSpread();
        }
    });
}

showSpread();

if (closeLightboxButton) closeLightboxButton.addEventListener("click", closeLightbox);
if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
}

if (lightboxPreviousButton) {
    lightboxPreviousButton.addEventListener("click", () => {
        showLightboxImage(currentLightboxIndex - 1);
    });
}

if (lightboxNextButton) {
    lightboxNextButton.addEventListener("click", () => {
        showLightboxImage(currentLightboxIndex + 1);
    });
}

document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxImage(currentLightboxIndex - 1);
    if (event.key === "ArrowRight") showLightboxImage(currentLightboxIndex + 1);
});

setInterval(createtextBubble, 1200);
setInterval(createFloatingHeart, 600);