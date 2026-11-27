const clocks = []

const clockWall = document.getElementById("clockWall");

async function loadClocks() {
    const response = await fetch("/api/profiles/");
    const profiles = await response.json();

    if (profiles.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No clocks have been set yet. Go to profile page to set one"
        clockWall.append(msg);
        return;
    }

    for (const profile of profiles) {
        const clockCard = document.createElement("div");
        clockCard.className = "clockCard";
        clockWall.append(clockCard);

        const profileName = document.createElement("h3");
        const profileZone = document.createElement("p");
        const profileTime = document.createElement("p");
        profileName.textContent = profile.username;
        profileZone.textContent = profile.timezone
        clockCard.append(profileName);
        clockCard.append(profileZone);
        clockCard.append(profileTime);

        const formatter = new Intl.DateTimeFormat(undefined, {
            timeZone: profile.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        clocks.push({element: profileTime, formatter: formatter})
    }

    updateClocks();
    setInterval(updateClocks, 1000);

}

function updateClocks() {
    const nowTime = new Date();
    for (const clock of clocks) {
        clock.element.textContent = clock.formatter.format(nowTime);
    }

}

loadClocks()