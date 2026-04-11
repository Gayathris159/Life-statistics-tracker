const birthInput = document.getElementById("birthDate");
const resultBox = document.getElementById("result");
const errorBox = document.getElementById("error");

function calculate() {
    const input = birthInput.value;
    errorBox.textContent = "";

    if (!input) {
        errorBox.textContent = "Select your birth date!";
        return;
    }

    const birth = new Date(input);
    const today = new Date();

    if (birth > today) {
        errorBox.textContent = "That birthday hasn't happened in this universe yet";
        return;
    }

    const daysLived = Math.floor((today - birth) / (1000*60*60*24));

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

    const daysLeft = Math.ceil((nextBirthday - today) / (1000*60*60*24));

    const zodiac = getZodiac(birth.getDate(), birth.getMonth() + 1);

    const kmPerDayOrbit = 2570000;
    const milkyWayPerDay = 19900000;
    const avgHeartRate = 70;
    const sleepHoursPerDay = 8;

    const sunDistance = daysLived * kmPerDayOrbit;
    const moonCycles = daysLived / 29.5;
    const spaceDistance = daysLived * milkyWayPerDay;
    const heartbeats = daysLived * 24 * 60 * avgHeartRate;
    const sleepDays = (daysLived * sleepHoursPerDay) / 24;

    resultBox.innerHTML = `
        🎂 Age: <span class="highlight">${years}</span>y ${months}m ${days}d<br><br>
        🌍 Days lived: <span class="highlight">${daysLived}</span><br><br>
        🎉 Next Birthday: <span class="highlight">${daysLeft}</span> days<br><br>
        ♈ Zodiac: <span class="highlight">${zodiac}</span>

        <h3>Since you were born...</h3>
        Your heart has beaten (approx.): <span class="highlight">${heartbeats.toLocaleString()}</span> times<br><br>
        You've travelled around Sun: <span class="highlight">${sunDistance.toLocaleString()}</span> km<br><br>
        The Moon has orbited around you: <span class="highlight">${moonCycles.toFixed(2)}</span> times<br><br>
        You've travelled around milkyway: <span class="highlight">${spaceDistance.toLocaleString()}</span> km<br><br>
        You have slept (approx.): <span class="highlight">${sleepDays.toFixed(1)}</span> days
    `;

    resultBox.classList.add("show");
}

function clearData() {
    birthInput.value = "";
    resultBox.innerHTML = "";
    resultBox.classList.remove("show");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function getZodiac(day, month) {
    if ((month==3&&day>=21)||(month==4&&day<=19)) return "Aries ♈";
    if ((month==4&&day>=20)||(month==5&&day<=20)) return "Taurus ♉";
    if ((month==5&&day>=21)||(month==6&&day<=20)) return "Gemini ♊";
    if ((month==6&&day>=21)||(month==7&&day<=22)) return "Cancer ♋";
    if ((month==7&&day>=23)||(month==8&&day<=22)) return "Leo ♌";
    if ((month==8&&day>=23)||(month==9&&day<=22)) return "Virgo ♍";
    if ((month==9&&day>=23)||(month==10&&day<=22)) return "Libra ♎";
    if ((month==10&&day>=23)||(month==11&&day<=21)) return "Scorpio ♏";
    if ((month==11&&day>=22)||(month==12&&day<=21)) return "Sagittarius ♐";
    if ((month==12&&day>=22)||(month==1&&day<=19)) return "Capricorn ♑";
    if ((month==1&&day>=20)||(month==2&&day<=18)) return "Aquarius ♒";
    return "Pisces ♓";
}

birthInput.addEventListener("change", () => {
    document.querySelector(".placeholder").style.display = "none";
});
