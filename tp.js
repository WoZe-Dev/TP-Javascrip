const questions = [
    {
        question: "Quand était la Fracture ? ",
        options: ["67", "Expédition Zéro", "Capacités que vous internalisez en utilisant Pictos au combat après suffisamment de temps"],
        answer: "67"
    },
    {
        question: "Quelle fut la Première Expédition pour Quitter le Continent?",
        options: ["L'Expédition 100", "L'Expédition 99", "L'Expédition 70", "L'Expédition Zéro"],
        answer: "L'Expédition Zéro"
    },
    {
        question: "c'est quoi une lumina",
        options: ["une capacité qu'on internalise après avoir utilisé un picto suffisamment souvent au combat", "un type d'arme spécial", "un parfum uniquement fabriqué à lumière"],
        answer: "une capacité qu'on internalise après avoir utilisé un picto suffisamment souvent au combat"
    },
    {
        question: "Quelles sont les 2 personnages principaux de la série ?",
        options: ["Gustave et Sciel ", "Verso et Monaco", "Sciel et lune ", "Gustave et Maelle"],
        answer: "Gustave et Maelle"
    },
];


let currentQuestion = 0;
let score = 0;
let userAnswers = [];


const container = document.querySelector('.container');
const startButton = document.getElementById('startButton');
const prevButton = document.getElementById('prevButton'); 
const nextButton = document.getElementById('nextButton');
const validateButton = document.getElementById('validateButton');


startButton.addEventListener('click', startQuiz);
prevButton.addEventListener('click', showPreviousQuestion); 
nextButton.addEventListener('click', showNextQuestion);
validateButton.addEventListener('click', showResults);

// Function pour démarrer le quiz
function startQuiz() {
    // Reset le quiz
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);
    
    // masquer le button de démarrage
    startButton.style.display = 'none';
    showQuestion();
}

// Fonction pour afficher la question précédente
function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Function pour afficher les quesiton
function showQuestion() {
    // effacer la zone des questions
    clearQuestionArea();
    
    // creer les questions
    const questionElement = document.createElement('div');
    questionElement.id = 'question-area';
    questionElement.className = 'mt-4'; 
    
    // Ajout de la barre de progression
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress mb-4';
    progressContainer.style.height = '10px';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.role = 'progressbar';
    progressBar.style.width = `${(currentQuestion + 1) / questions.length * 100}%`;
    progressBar.setAttribute('aria-valuenow', currentQuestion + 1);
    progressBar.setAttribute('aria-valuemin', 0);
    progressBar.setAttribute('aria-valuemax', questions.length);
    
    progressContainer.appendChild(progressBar);
    questionElement.appendChild(progressContainer);
    
    // ajouter le titre de la question
    const questionTitle = document.createElement('h2');
    questionTitle.textContent = questions[currentQuestion].question;
    questionElement.appendChild(questionTitle);
    
    // ajouter le compteur de questions 
    const questionCounter = document.createElement('p');
    questionCounter.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    questionElement.appendChild(questionCounter);
    
    // ajouter les options de réponse
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container mt-3';
    
    questions[currentQuestion].options.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'form-check mb-2';
        
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.className = 'form-check-input';
        optionInput.name = 'quiz-option';
        optionInput.id = `option-${index}`;
        optionInput.value = option;
        optionInput.checked = userAnswers[currentQuestion] === option;
        
        optionInput.addEventListener('change', () => {
            userAnswers[currentQuestion] = option;
        });
        
        const optionLabel = document.createElement('label');
        optionLabel.className = 'form-check-label';
        optionLabel.htmlFor = `option-${index}`;
        optionLabel.textContent = option;
        
        optionContainer.appendChild(optionInput);
        optionContainer.appendChild(optionLabel);
        optionsContainer.appendChild(optionContainer);
    });
    
    questionElement.appendChild(optionsContainer);
    container.appendChild(questionElement);
    
    // Gérer l'affichage des boutons de navigation
    prevButton.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    nextButton.style.display = currentQuestion < questions.length - 1 ? 'inline-block' : 'none';
    validateButton.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
}

// fonction pour effacer la zone de question
function clearQuestionArea() {
    const existingQuestion = document.getElementById('question-area');
    if (existingQuestion) {
        existingQuestion.remove();
    }
    
    const resultArea = document.getElementById('result-area');
    if (resultArea) {
        resultArea.remove();
    }
}

// fonction pour afficher la question suivante
function showNextQuestion() {
    currentQuestion++;
    showQuestion();
}

// fonction pour afficher les résultats
function showResults() {
    // reset le score
    score = 0;
    
    // calculer le score
    for (let i = 0; i < questions.length; i++) {
        // comparer la réponse de l'utilisateur avec la réponse correcte
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    // effacer la zone de question 
    clearQuestionArea();
    
    // Masquer tous les boutons de navigation
    nextButton.style.display = 'none';
    validateButton.style.display = 'none';
    
    // afficher les résultats
    const resultElement = document.createElement('div');
    resultElement.id = 'result-area';
    resultElement.className = 'mt-4';
    
    const resultTitle = document.createElement('h2');
    resultTitle.textContent = 'Quiz terminé!';
    resultTitle.className = 'text-center mb-4';
    
    const scoreDisplay = document.createElement('p');
    scoreDisplay.className = 'lead mt-3 text-center';
    
    // afficher le score
    if (score === questions.length) {
        scoreDisplay.textContent = `Bravo! Vous avez gagné un jeton de festival`;
        scoreDisplay.className += ' text-success font-weight-bold';
    } else {
        scoreDisplay.textContent = `Votre score: ${score}/${questions.length}`;
    }
    
    resultElement.appendChild(resultTitle);
    resultElement.appendChild(scoreDisplay);
    
    // Ajouter le résumé des réponses
    const answerSummary = document.createElement('div');
    answerSummary.className = 'answer-summary mt-4';
    
    const summaryTitle = document.createElement('h3');
    summaryTitle.textContent = 'Résumé de vos réponses';
    summaryTitle.className = 'mb-3';
    answerSummary.appendChild(summaryTitle);
    
    // Créer un tableau pour les réponses
    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';
    
    // En-tête du tableau
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Question', 'Votre réponse', 'Réponse correcte', 'Résultat'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Corps du tableau
    const tbody = document.createElement('tbody');
    
    
    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        
        // Colonne Question
        const questionCell = document.createElement('td');
        questionCell.textContent = question.question;
        row.appendChild(questionCell);
        
        // Colonne Votre réponse
        const userAnswerCell = document.createElement('td');
        userAnswerCell.textContent = userAnswers[index] || '(Aucune réponse)';
        row.appendChild(userAnswerCell);
        
        // Colonne Réponse correcte
        const correctAnswerCell = document.createElement('td');
        correctAnswerCell.textContent = question.answer;
        row.appendChild(correctAnswerCell);
        
        // Colonne Résultat
        const resultCell = document.createElement('td');
        const isCorrect = userAnswers[index] === question.answer;
        
        if (isCorrect) {
            resultCell.textContent = '✓';
            resultCell.className = 'text-success';
        } else {
            resultCell.textContent = '✗';
            resultCell.className = 'text-danger';
        }
        
        row.appendChild(resultCell);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    table.className = 'table table-bordered table-striped';
    answerSummary.appendChild(table);
    resultElement.appendChild(answerSummary);
    
    // Bouton pour recommencer
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Recommencer le quiz';
    restartButton.className = 'btn btn-primary mt-3 d-block mx-auto';
    restartButton.addEventListener('click', startQuiz);
    
    resultElement.appendChild(restartButton);
    container.appendChild(resultElement);
}