// Translations object
const translations = {
    en: {
        'appTitle': 'Golf Course Handicap Calculator',
        'languageLabel': 'Language:',
        'handicapIndexLabel': 'Your Handicap Index:',
        'slopeRatingLabel': 'Course Slope Rating:',
        'courseRatingLabel': 'Course Rating:',
        'parLabel': 'Course Par:',
        'calculateButton': 'Calculate Course Handicap',
        'yourCourseHandicap': 'Your Course Handicap is',
        'invalidHandicapIndex': 'Please enter a valid Handicap Index (0 or higher).',
        'invalidSlopeRating': 'Please enter a valid Slope Rating (between 55 and 155).',
        'invalidCourseRating': 'Please enter a valid Course Rating (greater than 0).',
        'invalidPar': 'Please enter a valid Par (greater than 0).'
    },
    fr: {
        'appTitle': 'Calculateur de Handicap de Parcours de Golf',
        'languageLabel': 'Langue :',
        'handicapIndexLabel': 'Votre Index de Handicap :',
        'slopeRatingLabel': 'Indice de Difficulté du Parcours :',
        'courseRatingLabel': 'Évaluation du Parcours :',
        'parLabel': 'Par du Parcours :',
        'calculateButton': 'Calculer le Handicap de Parcours',
        'yourCourseHandicap': 'Votre Handicap de Parcours est',
        'invalidHandicapIndex': 'Veuillez entrer un index de handicap valide (0 ou plus).',
        'invalidSlopeRating': 'Veuillez entrer un indice de difficulté valide (entre 55 et 155).',
        'invalidCourseRating': 'Veuillez entrer une évaluation de parcours valide (supérieure à 0).',
        'invalidPar': 'Veuillez entrer un par valide (supérieur à 0).'
    },
    nl: {
        'appTitle': 'Golfbaan Handicap Calculator',
        'languageLabel': 'Taal:',
        'handicapIndexLabel': 'Uw Handicap Index:',
        'slopeRatingLabel': 'Baan Slope Rating:',
        'courseRatingLabel': 'Course Rating:',
        'parLabel': 'Par van de Baan:',
        'calculateButton': 'Bereken Baan Handicap',
        'yourCourseHandicap': 'Uw Baan Handicap is',
        'invalidHandicapIndex': 'Voer een geldige Handicap Index in (0 of hoger).',
        'invalidSlopeRating': 'Voer een geldige Slope Rating in (tussen 55 en 155).',
        'invalidCourseRating': 'Voer een geldige Course Rating in (groter dan 0).',
        'invalidPar': 'Voer een geldige Par in (groter dan 0).'
    }
};

// Current language, default to English
let currentLanguage = 'en';

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    // Update text elements
    document.getElementById('appTitle').innerText = translations[lang]['appTitle'];
    document.getElementById('labelHandicapIndex').innerText = translations[lang]['handicapIndexLabel'];
    document.getElementById('labelSlopeRating').innerText = translations[lang]['slopeRatingLabel'];
    document.getElementById('labelCourseRating').innerText = translations[lang]['courseRatingLabel'];
    document.getElementById('labelPar').innerText = translations[lang]['parLabel'];
    document.getElementById('calculateButton').innerText = translations[lang]['calculateButton'];
    document.getElementById('languageLabel').innerText = translations[lang]['languageLabel'];
    // Clear the result
    document.getElementById('courseHandicapResult').innerText = '';
}

// Initialize language on page load
window.onload = function() {
    // Set default language based on browser settings
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('fr')) {
        currentLanguage = 'fr';
    } else if (userLang.startsWith('nl')) {
        currentLanguage = 'nl';
    } else {
        currentLanguage = 'en';
    }
    document.getElementById('language').value = currentLanguage;
    changeLanguage(currentLanguage);
};

// Existing calculateCourseHandicap function with validation

// Existing code for localization (see next section)

// Function to calculate Course Handicap with validation
function calculateCourseHandicap() {
    const handicapIndex = parseFloat(document.getElementById('handicapIndex').value);
    const slopeRating = parseFloat(document.getElementById('slopeRating').value);
    const courseRating = parseFloat(document.getElementById('courseRating').value);
    const par = parseInt(document.getElementById('par').value);

    let errorMessages = [];

    // Validate Handicap Index
    if (isNaN(handicapIndex) || handicapIndex < 0) {
        errorMessages.push(translations[currentLanguage]['invalidHandicapIndex']);
    }

    // Validate Slope Rating
    if (isNaN(slopeRating) || slopeRating < 55 || slopeRating > 155) {
        errorMessages.push(translations[currentLanguage]['invalidSlopeRating']);
    }

    // Validate Course Rating
    if (isNaN(courseRating) || courseRating <= 0) {
        errorMessages.push(translations[currentLanguage]['invalidCourseRating']);
    }

    // Validate Par
    if (isNaN(par) || par <= 0) {
        errorMessages.push(translations[currentLanguage]['invalidPar']);
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join('\n'));
        return;
    }

    // WHS Course Handicap formula
    let courseHandicap = handicapIndex * (slopeRating / 113) + (courseRating - par);

    // Rounding to nearest whole number as per WHS guidelines
    courseHandicap = Math.round(courseHandicap);

    document.getElementById('courseHandicapResult').innerText = `${translations[currentLanguage]['yourCourseHandicap']}: ${courseHandicap}`;
}
