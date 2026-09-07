function setFocus() {
    document.getElementById("name").focus();
}
async function pinCode() {
    const pinVal = document.getElementById("pincode").value.trim();

    // Trigger only when a valid 6-digit number is entered
    if (pinVal.length === 6 && /^\d{6}$/.test(pinVal)) {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pinVal}`);
            const data = await response.json();

            if (data && data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
                const postOffice = data[0].PostOffice[0];
                document.getElementById("city").value = postOffice.District;
                document.getElementById("state").value = postOffice.State;
            } else {
                alert("Invalid Pincode. Please check and try again.");
                document.getElementById("city").value = "";
                document.getElementById("state").value = "";
            }
        } catch (error) {
            console.error("Error fetching pincode details:", error);
        }
    }
}