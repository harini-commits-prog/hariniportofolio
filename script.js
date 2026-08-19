const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});


window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        filter.classList.add("active");

        const selected = filter.dataset.filter;

        projects.forEach(project => {

            const categories = project.dataset.category;

            if (
                selected === "all" ||
                categories.includes(selected)
            ) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }

        });

    });

});


const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    formMessage.textContent = "Sending...";

    try {

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            formMessage.textContent = data.message;
            contactForm.reset();

        } else {

            formMessage.textContent =
                data.message || "Something went wrong.";

        }

    } catch (error) {

        formMessage.textContent =
            "Backend is not running. Start the backend server first.";

    }

});
