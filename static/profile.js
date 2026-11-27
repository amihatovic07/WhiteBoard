const usernameElement = document.getElementById("username");
const timezoneElement = document.getElementById("timezone");
const timezoneListElement = document.getElementById("timezoneList");
const timezoneList = Intl.supportedValuesOf("timeZone")
const submitBtn = document.getElementById("submitBtn");
const msg = document.getElementById("msg");

for (const timezone of timezoneList) {
    const option = document.createElement("option");
    option.value = timezone;
    timezoneListElement.appendChild(option);
}
//get the user's timezone using their browser
const userCompTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (timezoneList.includes(userCompTimezone)) {
    timezoneElement.value = userCompTimezone;
}
else {
    msg.textContent = "Your timezone is not found in IANA"
}

async function handleSave() {
    const username = usernameElement.value.trim();
    const timezone = timezoneElement.value.trim();

    if (username === "") {
        msg.textContent = "Please enter your Username";
        return;
    }
    
    else if (!timezoneList.includes(timezone)) {
        msg.textContent = "Please pick a timezone from the list";
        return;
    } 
        

    const response = await fetch("/api/profiles/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: username, timezone: timezone })
    });

    const data = await response.json();
    
    if (response.ok) {
        msg.textContent = "Success";
    }
    else {
        msg.textContent = data.error;
        
    }

}

submitBtn.addEventListener("click", handleSave);
