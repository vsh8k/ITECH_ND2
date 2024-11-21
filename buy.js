// Attach an event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");

    form.addEventListener("submit", (event) => {
        // Prevent the form from submitting
        event.preventDefault();

        // Validate form fields
        const name = document.getElementById("customer-name").value.trim();
        const email = document.getElementById("customer-email").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expirationDate = document.getElementById("expiration-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Regular expressions for validation
        const nameRegex = /^[a-zA-Z\s]{3,}$/; // Name must be at least 3 characters and contain only letters and spaces
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        const cardNumberRegex = /^\d{16}$/; // 16-digit card number
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
        const cvvRegex = /^\d{3,4}$/; // 3 or 4 digit CVV

        let errors = [];

        // Name validation
        if (!nameRegex.test(name)) {
            errors.push("Name must be at least 3 characters long and contain only letters.");
        }

        // Email validation
        if (!emailRegex.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        // Card number validation
        if (!cardNumberRegex.test(cardNumber)) {
            errors.push("Card number must be exactly 16 digits.");
        }

        // Expiration date validation
        if (!expirationDateRegex.test(expirationDate)) {
            errors.push("Expiration date must be in MM/YY format.");
        }

        // CVV validation
        if (!cvvRegex.test(cvv)) {
            errors.push("CVV must be 3 or 4 digits.");
        }

        // Display errors or proceed
        if (errors.length > 0) {
            alert("Please correct the following errors:\n\n" + errors.join("\n"));
        } else {
            // If everything is valid, redirect to another page
            window.location.href = "./index.html"; // Replace with your success page
        }
    });
});
