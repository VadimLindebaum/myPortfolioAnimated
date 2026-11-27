const menuButton = document.querySelector(".hamburger");
const menuLinks = document.querySelector(".menu-list");

menuButton.hidden = false;

menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
});

for (const link of menuLinks.querySelectorAll("a")) {
    link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
    });
}

const form = document.querySelector(".contact-form form");
const formStatus = document.querySelector("#form-status");

const errorMessages = {
    name: { empty: "Palun sisesta oma nimi." },
    email: {
        empty: "Palun sisesta oma e-posti aadress.",
        invalid: "Palun sisesta korrektne e-posti aadress, näiteks nimi@naide.ee."
    },
    message: { empty: "Palun kirjuta sõnum." }
};

function validateField(field) {
    const error = document.querySelector(`#${field.id}-error`);
    let message = "";

    if (field.value.trim() === "") {
        message = errorMessages[field.name].empty;
    } else if (field.type === "email" && !field.validity.valid) {
        message = errorMessages.email.invalid;
    }

    error.textContent = message;
    field.setAttribute("aria-invalid", String(message !== ""));
    return message === "";
}

for (const field of form.elements) {
    if (!field.name) continue;

    field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
            validateField(field);
        }
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...form.elements].filter((field) => field.name);
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
        formStatus.textContent = "Palun paranda vormis märgitud vead.";
        invalidFields[0].focus();
        return;
    }

    formStatus.textContent =
        "Aitäh! Palun vaata kontaktandmeid ja saada uuesti.";
    form.reset();
    for (const field of fields) {
        field.removeAttribute("aria-invalid");
    }
});
