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
        classError.textContent = "Please select a valid class.";
        document.getElementById("fee-amount").textContent = "₹0";
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
            classError.textContent = "English is not available for classes 11 and 12.";
            document.getElementById("fee-amount").textContent = "₹0";
            return;
        }
        if (isComputerSelected) totalFee += computerFee;
    } else if (classSelected === "ba_pass" || classSelected === "ba_honours") {
        // Validate subject selection for B.A
        if (artsGroupSelected > 0 || isEnglishSelected) {
            classError.textContent = "Only Sanskrit and Computer are available for B.A classes.";
            document.getElementById("fee-amount").textContent = "₹0";
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
    } else {
        classError.textContent = "Invalid class selection.";
        document.getElementById("fee-amount").textContent = "₹0";
        return;
    }

    // Display the total fee
    document.getElementById("fee-amount").textContent = `₹${totalFee}`;
}
