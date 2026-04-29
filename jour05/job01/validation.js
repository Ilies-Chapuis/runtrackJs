// ============================================================
// validation.js — Vérifie chaque champ de façon asynchrone
// "Asynchrone" = on attend un court délai avant de valider,
// comme si on interrogeait un serveur. Ici c'est simulé.
// ============================================================


// --- Fonctions utilitaires ---

// Affiche ou efface un message d'erreur sous un champ
function afficherErreur(idMessage, texte) {
    const zone = document.getElementById(idMessage);
    if (zone) zone.textContent = texte;
}

// Met une bordure verte (valide) ou rouge (invalide) sur le champ
function marquerChamp(input, estValide) {
    input.classList.remove("valide", "invalide");
    input.classList.add(estValide ? "valide" : "invalide");
}

// Petite fonction qui "attend" un délai (simule un appel serveur)
function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Enlève les balises HTML pour éviter les injections de code
function nettoyerTexte(texte) {
    const div = document.createElement("div");
    div.textContent = texte;
    return div.innerHTML;
}


// --- Validations individuelles (toutes asynchrones) ---

// Vérifie que le champ n'est pas vide
async function validerObligatoire(input, idMessage, nomChamp) {
    await attendre(200);
    const valeur = input.value.trim();
    if (valeur === "") {
        afficherErreur(idMessage, `Le champ "${nomChamp}" est obligatoire.`);
        marquerChamp(input, false);
        return false;
    }
    afficherErreur(idMessage, "");
    marquerChamp(input, true);
    return true;
}

// Vérifie le format de l'email avec une regex
async function validerEmail(input, idMessage) {
    await attendre(200);
    const valeur = input.value.trim();
    const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valeur === "") {
        afficherErreur(idMessage, "L'email est obligatoire.");
        marquerChamp(input, false);
        return false;
    }
    if (!formatEmail.test(valeur)) {
        afficherErreur(idMessage, "Format d'email invalide (ex: nom@domaine.fr).");
        marquerChamp(input, false);
        return false;
    }
    afficherErreur(idMessage, "");
    marquerChamp(input, true);
    return true;
}

// Vérifie que le mot de passe est assez sécurisé
async function validerMotDePasse(input, idMessage) {
    await attendre(200);
    const valeur = input.value;
    if (valeur === "") {
        afficherErreur(idMessage, "Le mot de passe est obligatoire.");
        marquerChamp(input, false);
        return false;
    }
    if (valeur.length < 8) {
        afficherErreur(idMessage, "Minimum 8 caractères.");
        marquerChamp(input, false);
        return false;
    }
    // Vérifie qu'il y a au moins une majuscule, un chiffre et un caractère spécial
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!regex.test(valeur)) {
        afficherErreur(idMessage, "Doit contenir 1 majuscule, 1 chiffre, 1 caractère spécial.");
        marquerChamp(input, false);
        return false;
    }
    afficherErreur(idMessage, "");
    marquerChamp(input, true);
    return true;
}

// Vérifie le format du code postal français (5 chiffres)
async function validerCodePostal(input, idMessage) {
    await attendre(200);
    const valeur = input.value.trim();
    const formatCP = /^\d{5}$/;
    if (valeur === "") {
        afficherErreur(idMessage, "Le code postal est obligatoire.");
        marquerChamp(input, false);
        return false;
    }
    if (!formatCP.test(valeur)) {
        afficherErreur(idMessage, "Le code postal doit contenir 5 chiffres (ex: 13001).");
        marquerChamp(input, false);
        return false;
    }
    afficherErreur(idMessage, "");
    marquerChamp(input, true);
    return true;
}