function showNotification(message, type = 'error') {
    const notification = document.querySelector('.notification'); // Select the notification element

    if (!notification) {
        console.error("Notification element not found");
        return;
    }

    // Add the type-specific class
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getIconForType(type)}</span>
        <span>${message}</span>
    `;

    // Show the notification
    notification.classList.remove('hidden');
    notification.classList.add('visible');

    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
    }, 3000);
}

// Helper function to get icons based on type
function getIconForType(type) {
    switch (type) {
        case 'success':
            return '✔️'; // Checkmark
        case 'error':
            return '❌'; // Cross
        case 'warning':
            return '⚠️'; // Warning symbol
        case 'info':
            return 'ℹ️'; // Info symbol
        default:
            return ''; // Default to no icon
    }
}


// Helper function to get icons based on type
function getIconForType(type) {
    switch (type) {
        case 'success':
            return '✔️'; // Checkmark
        case 'error':
            return '❌'; // Cross
        case 'warning':
            return '⚠️'; // Warning symbol
        case 'info':
            return 'ℹ️'; // Info symbol
        default:
            return ''; // Default to no icon
    }
}
// Load the EmailJS script
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("blr-upcm4Wz7FfZ_6"); // Replace with your public key
    console.log("EmailJS initialized");

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Disable the button and set text to "Sending..."
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        console.log("Sending email with:", { name, email, message });

        emailjs.send("service_a9ukqbw", "template_wx4xqro", {
            name: name,
            email: email,
            message: message
        })
        .then(function(response) {
            console.log("Success:", response);
            showNotification("Thank you for contacting us.", "success");

            // Clear form entries
            form.reset();
        })
        .catch(function(error) {
            console.error("Error:", error);
            showNotification("Failed to send the message. Please try again.", "error");
        })
        .finally(() => {
            // Re-enable the button and restore its original text
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
});
