let nombreSecret;
let tentatives;
let historique;

const input = document.getElementById('guessInput');
const btnDeviner = document.getElementById('guessBtn');
const btnRejouer = document.getElementById('restartBtn');
const messageElement = document.getElementById('message');
const tentativesSpan = document.querySelector('#attempts span');
const historiqueList = document.getElementById('historyList');
const MAX_TENTATIVES = 10;

// ========== INITIALISER LE JEU ==========
function initialiserJeu() {
    nombreSecret = Math.floor(Math.random() * 100) + 1;
    tentatives = 0;
    historique = [];
    
    // Réinitialiser l'affichage
    messageElement.textContent = '';
    messageElement.className = '';
    tentativesSpan.textContent = '0';
    historiqueList.innerHTML = '';
    input.value = '';
    input.disabled = false;
    btnDeviner.disabled = false;
    btnRejouer.style.display = 'none';
    
    console.log('Nombre secret :', nombreSecret); // Pour tester !
}

// ========== VÉRIFIER LA PROPOSITION ==========
function verifierProposition() {
    const proposition = parseInt(input.value);
    
    // Vérifier si c'est un nombre valide
    if (isNaN(proposition) || proposition < 1 || proposition > 100) {
        messageElement.textContent = '⚠️ Entre un nombre entre 1 et 100 !';
        return;
    }
    
    // Vérifier si déjà essayé
    if (historique.includes(proposition)) {
        messageElement.textContent = '🔄 Tu as déjà essayé ce nombre !';
        return;
    }
    
    // Incrémenter tentatives et ajouter à l'historique
    tentatives++;
    historique.push(proposition);
    tentativesSpan.textContent = tentatives;

    if (tentatives >= MAX_TENTATIVES && proposition !== nombreSecret) {
        messageElement.textContent = `💀 Perdu ! C'était ${nombreSecret}`;
        messageElement.className = 'lose'; // Ajoute une classe CSS
        finPartie();
    }
    
    // Ajouter à l'historique visuel
    const li = document.createElement('li');
    li.textContent = proposition;
    historiqueList.appendChild(li);
    
    // Comparer avec le nombre secret
    if (proposition === nombreSecret) {
        messageElement.textContent = `🎉 Gagné en ${tentatives} tentative(s) !`;
        messageElement.className = 'win';
        finPartie();
    } else if (proposition < nombreSecret) {
        messageElement.textContent = '📈 Trop bas !';
        messageElement.className = 'too-low';
    } else {
        messageElement.textContent = '📉 Trop haut !';
        messageElement.className = 'too-high';
    }

    const difference = Math.abs(proposition - nombreSecret);

    if (difference <= 5) {
        messageElement.textContent += ' 🔥 Brûlant !';
    } else if (difference <= 10) {
        messageElement.textContent += ' 🌡️ Chaud !';
    } else if (difference <= 20) {
        messageElement.textContent += ' ❄️ Tiède...';
    }
    
    input.value = '';
    input.focus();
}

// ========== FIN DE PARTIE ==========
function finPartie() {
    input.disabled = true;
    btnDeviner.disabled = true;
    btnRejouer.style.display = 'block';

    const meilleurScore = localStorage.getItem('meilleurScore');

    if (!meilleurScore || tentatives < parseInt(meilleurScore)) {
        localStorage.setItem('meilleurScore', tentatives);
        messageElement.textContent += ' 🏆 Nouveau record !';
    }

}

// ========== ÉVÉNEMENTS ==========
btnDeviner.addEventListener('click', verifierProposition);

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verifierProposition();
    }
});

btnRejouer.addEventListener('click', initialiserJeu);

// Lancer le jeu au chargement
document.addEventListener('DOMContentLoaded', initialiserJeu);
