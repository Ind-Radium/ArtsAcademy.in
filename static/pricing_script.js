// Define fee structure for each subject and class
const feeStructure = {
    bengali: { "6": 350, "7": 350, "8": 350, "9": 400, "10": 400,"11": 400,"12":400 },
    history: { "6": 350, "7": 350, "8": 350, "9": 400, "10": 400,"11": 400,"12":400 },
    geography: { "6": 350, "7": 350, "8": 350, "9": 400, "10": 400,"11": 400,"12":400 },
    sanskrit: { "6": 350, "7": 350, "8": 350, "9": 400, "10": 400,"11": 400,"12":400 },
    english: { "6": 300, "7": 300, "8": 300, "9": 300, "10": 300,"11": 300,"12":300 },
    computer: { "6": 250, "7": 250, "8": 250, "9": 250, "10": 250,"11": 250,"12":250 }
};

// Function to calculate total fee
function updateTotal() {
    const classSelected = document.getElementById("class").value;
    const classError = document.getElementById("class-error");

    // Class Validation: If class is less than 6 or more than 12, show error
    if (classSelected < 6 || classSelected > 12) {
        classError.textContent = "Invalid class. Please enter a class between 6 and 12.";
        document.getElementById("fee-amount").textContent = "₹0";
        return;
    } else {
        classError.textContent = "";
    }

    let totalFee = 0;
    let artsSubjectsSelected = 0;

    // Check if any of the Arts subjects are selected
    if (document.getElementById("bengali").checked) {
        artsSubjectsSelected++;
    }
    if (document.getElementById("history").checked) {
        artsSubjectsSelected++;
    }
    if (document.getElementById("geography").checked) {
        artsSubjectsSelected++;
    }
    if (document.getElementById("sanskrit").checked) {
        artsSubjectsSelected++;
    }

    // If any Arts subjects are selected, calculate the fee for Arts subjects as a group
    if (artsSubjectsSelected > 0) {
        totalFee += (classSelected <= 8 ? 350 : 400); // Arts subjects fee per class
    }

    // Add the fee for non-Arts subjects (English and Computer)
    if (document.getElementById("english").checked) {
        totalFee += feeStructure.english[classSelected];
    }
    if (document.getElementById("computer").checked) {
        totalFee += feeStructure.computer[classSelected];
    }

    // Display the total fee
    document.getElementById("fee-amount").textContent = `₹${totalFee}`;
}
