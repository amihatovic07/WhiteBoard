const username = document.getElementById("username");
const timezones = document.getElementById("timezone");
const submitBtn = document.getElementById("submitBtn")
const output = document.getElementById("output");
const timezoneOptions = document.querySelectorAll("#timezoneList option")

function handleSubmit() {
    const user = username.value.trim();
    if (user === "") {
        output.textContent = "Please enter your Username";
        return;
    }
    

    const selectedTimezone = [...timezoneOptions].find(o => o.value === timezones.value);
    if (!selectedTimezone) {
        output.textContent = "Please pick a timezone from the list";
        return;
    } 
    
    output.textContent = `${user} : ${selectedTimezone.value}`
    
}

submitBtn.addEventListener("click", handleSubmit);
