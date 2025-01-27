// Ziel-Datum ermitteln (4. März im aktuellen Jahr oder, falls schon vorbei, nächstes Jahr)
const now = new Date();
const currentYear = now.getFullYear();
const marchFourThisYear = new Date(`March 4, ${currentYear} 00:00:00`);
const targetYear = (now > marchFourThisYear) ? currentYear + 1 : currentYear;
const countdownDate = new Date(`March 4, ${targetYear} 00:00:00`).getTime();

// Hol dir die HTML-Elemente
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Aktualisiere die Countdown-Anzeige
function updateCountdown() {
    const nowTime = new Date().getTime();
    const distance = countdownDate - nowTime;

    // Falls abgelaufen, alles auf 0
    if (distance <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    // Restliche Zeit in Tage, Stunden, Minuten, Sekunden
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mit führenden Nullen formatieren (z.B. '07')
    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
}

// Jede Sekunde aktualisieren
setInterval(updateCountdown, 1000);
// Einmal direkt beim Laden aufrufen
updateCountdown();
