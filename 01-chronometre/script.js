document.addEventListener('DOMContentLoaded', function() {
    let heures = 0;
    let minutes = 0;
    let secondes = 0;
    let intervalId = null;
    let isRunning = false;

    const affichage = document.getElementById('display');
    const toggleBtn = document.getElementById('toggle');
    const resetBtn = document.getElementById('reset');

    function mettreAJour() {
        secondes++;
        
        if (secondes === 60) {
            secondes = 0;
            minutes++;
        }
        
        if (minutes === 60) {
            minutes = 0;
            heures++;
        }
        
        affichage.textContent = 
            `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondes).padStart(2, '0')}`;
    }

    // LA FONCTION INTELLIGENTE
    function toggleChrono() {
        if (isRunning) {
            // Si en marche → PAUSE
            clearInterval(intervalId);
            toggleBtn.textContent = '▶️ Start';
            toggleBtn.classList.remove('running');
            toggleBtn.classList.add('paused');
        } else {
            // Si arrêté → START
            intervalId = setInterval(mettreAJour, 1000);
            toggleBtn.textContent = '⏸️ Pause';
            toggleBtn.classList.remove('paused');
            toggleBtn.classList.add('running');
        }
        
        isRunning = !isRunning; // Inverse l'état
    }

    function reset() {
        clearInterval(intervalId);
        heures = 0;
        minutes = 0;
        secondes = 0;
        isRunning = false;
        
        affichage.textContent = '00:00:00';
        toggleBtn.textContent = '▶️ Start';
        toggleBtn.classList.remove('running', 'paused');
    }

    // Événements
    toggleBtn.addEventListener('click', toggleChrono);
    resetBtn.addEventListener('click', reset);
});



/* VERSION 1
// Variables globales
let heures = 0;
let minutes = 0;
let secondes = 0;
let intervalId = null;
let isRunning = false;

//Sélection des éléments
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

// Fonction pour incrémenter le temps
function incrementTime() {
    secondes++;
    if (secondes === 60) {
        secondes = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        heures++;
    }
    updateDisplay();
}

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    const h = String(heures).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(secondes).padStart(2, '0');
    display.textContent = `${h}:${m}:${s}`;
}

// Démarrer le chronomètre
function start() {
    if (!isRunning) {
        intervalId = setInterval(incrementTime, 1000);
        isRunning = true;
    }
}

// Arrêter le chronomètre
function pause() {
    clearInterval(intervalId);
    isRunning = false;
}

// Réinitialiser le chronomètre
function reset() {
    pause();
    heures = 0;
    minutes = 0;
    secondes = 0;
    updateDisplay();
}

// Événements
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
*/