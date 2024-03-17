let aktualnyCzas = new Date();

aktualnyCzas.setHours(0, 0, 0, 0); // Ustawiamy początkowy czas na 00:00:00

const zegarElement = document.querySelector('.Zegar h1');

function aktualizujZegar() {

    if(aktualnyCzas.getHours() === 0 && aktualnyCzas.getMinutes() === 0 && aktualnyCzas.getSeconds() === 0) {

        clearInterval(intervalId); // Zatrzymujemy timer

        intervalId = null;

        return;

    }

    aktualnyCzas.setSeconds(aktualnyCzas.getSeconds() - 1); // Odejmujemy sekundę


    const godziny = aktualnyCzas.getHours().toString().padStart(2, '0');

    const minuty = aktualnyCzas.getMinutes().toString().padStart(2, '0');

    const sekundy = aktualnyCzas.getSeconds().toString().padStart(2, '0');

    zegarElement.textContent = `${godziny}:${minuty}:${sekundy}`;

}

let intervalId = null;

const przyciskStart = document.querySelector('.Przycisk-Start');

przyciskStart.addEventListener('click', function() {

    if (intervalId !== null) return; // Jeśli timer jest już uruchomiony, nie rób nic


    intervalId = setInterval(aktualizujZegar, 1000); // Aktualizuj co sekundę

});

const plusElement = document.querySelector('.Przycisk-Plus');

function dodajSekunde() {

    if (aktualnyCzas.getSeconds() === 60) {

        aktualnyCzas.setMinutes(aktualnyCzas.getMinutes() + 1);

        aktualnyCzas.setSeconds(0);

    } 
    
    else {
        
        aktualnyCzas.setSeconds(aktualnyCzas.getSeconds() + 6);
    }

    aktualizujZegar(); // Aktualizujemy zegar od razu

}

plusElement.addEventListener('click', dodajSekunde);

const minusElement = document.querySelector('.Przycisk-Minus');

function odejmijSekunde() {

    if (aktualnyCzas.getSeconds() < 5 && aktualnyCzas.getMinutes() > 0) {

        aktualnyCzas.setMinutes(aktualnyCzas.getMinutes() - 1);

        aktualnyCzas.setSeconds(aktualnyCzas.getSeconds() + 55);

    } else if (aktualnyCzas.getSeconds() >= 5) {

        aktualnyCzas.setSeconds(aktualnyCzas.getSeconds() - 4);

    }

    aktualizujZegar(); // Aktualizujemy zegar od razu
}

minusElement.addEventListener('click', odejmijSekunde);

const resetElement = document.querySelector('.Przycisk-Pauza');

let czyPauza = false;

function resetujZegar() {

    if (!czyPauza) {

        if (intervalId !== null) {

            clearInterval(intervalId);

            intervalId = null;

        }

        czyPauza = true;

    } 

    else {

        startZegar(); // Wznawiamy odliczanie

        czyPauza = false;

    }

}

function startZegar() {

    aktualizujZegar();

    if (intervalId !== null) {

        clearInterval(intervalId); // Zatrzymujemy poprzedni interwał

    }

    intervalId = setInterval(odejmijSekunde, 0.00001); // Wznawiamy timer

    czyPauza = false;

}

resetElement.addEventListener('click', resetujZegar);