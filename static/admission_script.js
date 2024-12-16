// Function to show notifications
function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');

    if (!notification) {
        console.error("Notification element not found");
        return;
    }

    // Clear existing styles and content
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getIconForType(type)}</span>
        <span>${message}</span>
    `;

    // Dynamically adjust position for screen size (optional, already centered with CSS)
    const viewportHeight = window.innerHeight;
    notification.style.top = `${viewportHeight * 0.1}px`; // 10% from the top of the viewport

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



// Attach the calculateFee function only to the "Calculate Fee" button
document.getElementById("calculate-fee").addEventListener("click", calculateFee);

function calculateFee() {
    const classSelected = document.getElementById("class").value;
    const classError = document.getElementById("class-error");

    // Define subject fees
    const groupedFee = { "6-8": 350, "9-10": 400 };
    const baFee = { pass: 350, honours: 400 };
    const englishFee = 300;
    const computerFee = 250;

    // Validate selected class
    if (!classSelected) {
        showNotification("Please select your class !","error")
        document.getElementById("fee-display").textContent = "₹0";
        return;
    } else {
        classError.textContent = "";
    }

    // Initialize total fee
    let totalFee = 0;
    let artsGroupSelected = 0;
    let isEnglishSelected = document.getElementById("english").checked;
    let isComputerSelected = document.getElementById("computer").checked;
    let isSanskritSelected = document.getElementById("sanskrit").checked;

    // Check if grouped subjects are selected
    if (document.getElementById("bengali").checked) artsGroupSelected++;
    if (document.getElementById("history").checked) artsGroupSelected++;
    if (document.getElementById("geography").checked) artsGroupSelected++;

    // Class-based logic
    if (classSelected >= 6 && classSelected <= 8) {
        // Grouped fees for classes 6 to 8
        if (artsGroupSelected > 0) {
            totalFee += groupedFee["6-8"]; // Apply group fee once
        }

        // Add separate fees for English and Computer
        if (isEnglishSelected) totalFee += englishFee;
        if (isComputerSelected) totalFee += computerFee;
    } else if (classSelected >= 9 && classSelected <= 10) {
        // Grouped fees for classes 9 to 10
        if (artsGroupSelected > 0) {
            totalFee += groupedFee["9-10"]; // Apply group fee once
        }

        // Add separate fees for English and Computer
        if (isEnglishSelected) totalFee += englishFee;
        if (isComputerSelected) totalFee += computerFee;
    } else if (classSelected >= 11 && classSelected <= 12) {
        // All subjects are separate for classes 11 and 12
        if (artsGroupSelected > 0) {
            totalFee += artsGroupSelected * 400; // Fee per individual subject
        }

        // Add separate fees for English and Computer
        if (isEnglishSelected) {
            showNotification("English is not available for class 11 and 12.","error")
            document.getElementById("fee-display").textContent = "₹0";
            return;
        }
        if (isComputerSelected) totalFee += computerFee;
    } else if (classSelected === "ba_pass" || classSelected === "ba_honours") {
        // Validate subject selection for B.A
        if (artsGroupSelected > 0 || isEnglishSelected) {
            showNotification("Only sanskrit and computer is avaliable for B.A students.","error")

            document.getElementById("fee-display").textContent = "₹0";
            return;
        }

        // Apply fees for B.A Pass or Honours
        if (classSelected === "ba_pass") {
            if (isSanskritSelected) totalFee += baFee.pass;
            if (isComputerSelected) totalFee += computerFee;
        } else if (classSelected === "ba_honours") {
            if (isSanskritSelected) totalFee += baFee.honours;
            if (isComputerSelected) totalFee += computerFee;
        }
    } else if (classSelected === "computer_any") {

        if (isComputerSelected) totalFee += computerFee;
        if (isEnglishSelected) {
            showNotification("Only computer is available.","error")
        }
        if (artsGroupSelected) {
            showNotification("Only computer is available.","error")
        }
        if (isSanskritSelected) {
            showNotification("Only computer is available.","error")
        }

    } else {
        showNotification("Invalid class selection !","error")
        document.getElementById("fee-display").textContent = "₹0";
        return;
    }

    // Display the total fee
    document.getElementById("fee-display").textContent = `₹${totalFee}`;
}

// <----------------------------------------------------------------------------------------------------------------------->

document.getElementById("admission-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Create a FormData object to hold form data including file
    const formData = new FormData();

    // Get form values
    const name = document.getElementById("name").value;
    const guardianName = document.getElementById("guardian-name").value;
    const guardianPhone = document.getElementById("guardian-phone").value;
    const studentPhone = document.getElementById("student-phone").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const className = document.getElementById("class").value;

    // Add form data to FormData object
    formData.append("name", name);
    formData.append("guardian-name", guardianName);
    formData.append("guardian-phone", guardianPhone);
    formData.append("student-phone", studentPhone);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("class", className);

    // Get selected subjects
    const subjects = [];
    const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
    subjectCheckboxes.forEach(function(checkbox) {
        subjects.push(checkbox.value);
    });
    formData.append("subjects", subjects);

    // Get photo file
    const photo = document.getElementById("photo").files[0];
    if (photo) {
        formData.append("photo", photo);
    }

    // Show loading message or notification
    showNotification("Now you are a member of Arts Academy")
    document.getElementById("btn").innerText = "Submitting your admission...";

    // Submit form data to the server using fetch
    fetch("http://127.0.0.1:5000//submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            document.getElementById("notification").innerText = data.message;
            document.getElementById("notification").classList.add("success");
        } else if (data.error) {
            document.getElementById("notification").innerText = `Error: ${data.error}`;
            document.getElementById("notification").classList.add("error");
        }
    })
    .catch(error => {
        document.getElementById("notification").innerText = `Error: ${error}`;
        document.getElementById("notification").classList.add("error");
    });
});

