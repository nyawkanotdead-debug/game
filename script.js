/* =========================================
   ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ
========================================= */

function goToLove() {

    window.location.href = "love.html";

}


function goToQuestions() {

    window.location.href = "questions.html";

}


function goToWish() {

    window.location.href = "wish.html";

}


/* =========================================
   ИГРА MEMORY
========================================= */

const gameBoard = document.getElementById("gameBoard");


if (gameBoard) {

    let cards = [

        "🌸",
        "🌸",

        "🌷",
        "🌷",

        "🦋",
        "🦋",

        "🌙",
        "🌙",

        "❤️"

    ];


    // Перемешивание

    cards.sort(() => Math.random() - 0.5);


    let firstCard = null;

    let secondCard = null;

    let lockBoard = false;

    let matchedPairs = 0;

    let heartFound = false;


    cards.forEach((symbol, index) => {

        const card = document.createElement("div");

        card.classList.add("game-card");


        card.innerHTML = `

            <div class="game-card-inner">

                <div class="game-front">
                    ?
                </div>

                <div class="game-back">
                    ${symbol}
                </div>

            </div>

        `;


        card.dataset.symbol = symbol;


        card.addEventListener("click", function () {

            flipCard(card);

        });


        gameBoard.appendChild(card);

    });


    function flipCard(card) {

        if (lockBoard) return;

        if (card === firstCard) return;

        if (card.classList.contains("matched")) return;


        card.classList.add("open");


        if (!firstCard) {

            firstCard = card;

            return;
        }


        secondCard = card;

        checkCards();

    }


    function checkCards() {

        const firstSymbol = firstCard.dataset.symbol;

        const secondSymbol = secondCard.dataset.symbol;


        // Сердечко

        if (firstSymbol === "❤️" || secondSymbol === "❤️") {

            if (firstSymbol === secondSymbol) {

                heartFound = true;

                firstCard.classList.add("matched");

                secondCard.classList.add("matched");

                resetCards();

                showGameMessage(
                    "Ты нашла самое важное сердечко ❤️"
                );

                checkGameFinished();

            } else {

                unflipCards();

            }

            return;
        }


        // Одинаковые карточки

        if (firstSymbol === secondSymbol) {

            firstCard.classList.add("matched");

            secondCard.classList.add("matched");

            matchedPairs++;

            resetCards();

            showGameMessage(
                "Отлично! Нашла пару 💕"
            );

            checkGameFinished();

        } else {

            showGameMessage(
                "Не совсем 😌 Попробуй ещё раз."
            );

            unflipCards();

        }

    }


    function resetCards() {

        firstCard = null;

        secondCard = null;

        lockBoard = false;

    }


    function unflipCards() {

        lockBoard = true;


        setTimeout(() => {

            firstCard.classList.remove("open");

            secondCard.classList.remove("open");

            resetCards();

        }, 800);

    }


    function checkGameFinished() {

        if (matchedPairs === 4 && heartFound) {

            setTimeout(() => {

                showGameMessage(
                    "Ты нашла всё! Теперь можно идти дальше ❤️"
                );


                const nextButton =
                    document.getElementById("nextButton");


                if (nextButton) {

                    nextButton.classList.remove("hidden");

                }

            }, 500);

        }

    }


    function showGameMessage(message) {

        const messageElement =
            document.getElementById("gameMessage");


        if (messageElement) {

            messageElement.textContent = message;

        }

    }

}


/* =========================================
   LOVE CARDS
========================================= */

let openedLoveCards = 0;


function openLoveCard(card) {

    if (card.classList.contains("open")) {

        return;

    }


    card.classList.add("open");


    openedLoveCards++;


    if (openedLoveCards === 4) {

        const button =
            document.getElementById("loveNextButton");


        if (button) {

            setTimeout(() => {

                button.classList.remove("hidden");

            }, 500);

        }

    }

}


/* =========================================
   ВОПРОСЫ
========================================= */

const questions = [

    {

        question:
            "Кто сегодня самая красивая? 😌",

        answers: [

            "Ты ❤️",

            "Конечно ты",

            "Даже не спрашивай",

            "Все варианты выше"

        ],

        correct: 3

    },


    {

        question:
            "Что я хочу видеть на твоём лице чаще всего?",

        answers: [

            "Грусть",

            "Улыбку ❤️",

            "Злость",

            "Сон"

        ],

        correct: 1

    },


    {

        question:
            "Что тебе сегодня обязательно нужно получить?",

        answers: [

            "Домашку",

            "Проблемы",

            "Много любви ❤️",

            "Ранний подъём"

        ],

        correct: 2

    },


    {

        question:
            "Какое у тебя сегодня настроение должно быть?",

        answers: [

            "100% счастливое ❤️",

            "Плохое",

            "Очень грустное",

            "Как получится"

        ],

        correct: 0

    }

];


let currentQuestion = 0;

let questionAnswered = false;


const questionText =
    document.getElementById("questionText");


const questionNumber =
    document.getElementById("questionNumber");


const answersContainer =
    document.getElementById("answers");


if (questionText && answersContainer) {

    loadQuestion();

}


function loadQuestion() {

    questionAnswered = false;


    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Вопрос ${currentQuestion + 1} из ${questions.length}`;


    questionText.textContent =
        question.question;


    answersContainer.innerHTML = "";


    const message =
        document.getElementById("questionMessage");


    message.textContent = "";


    const nextButton =
        document.getElementById("questionNext");


    nextButton.classList.add("hidden");


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");


        button.classList.add("answer-button");


        button.textContent = answer;


        button.addEventListener("click", () => {

            checkAnswer(index, button);

        });


        answersContainer.appendChild(button);

    });

}


function checkAnswer(index, button) {

    if (questionAnswered) return;


    const question =
        questions[currentQuestion];


    const message =
        document.getElementById("questionMessage");


    if (index === question.correct) {

        questionAnswered = true;

        button.classList.add("correct");


        message.textContent =
            "Правильно! ❤️";


        message.style.color = "#4d9b5d";


        const allButtons =
            document.querySelectorAll(".answer-button");


        allButtons.forEach(btn => {

            btn.disabled = true;

        });


        if (currentQuestion < questions.length - 1) {

            document
                .getElementById("questionNext")
                .classList.remove("hidden");

        } else {

            document
                .getElementById("finishButton")
                .classList.remove("hidden");

        }

    } else {

        button.classList.add("wrong");


        message.textContent =
            "Хмм... попробуй ещё раз 😏";


        message.style.color = "#c44b68";


        setTimeout(() => {

            button.classList.remove("wrong");

        }, 700);

    }

}


function nextQuestion() {

    currentQuestion++;

    loadQuestion();

}


/* =========================================
   ПАДАЮЩИЕ СЕРДЕЧКИ
========================================= */

const heartsContainer =
    document.getElementById("hearts-container");


if (heartsContainer) {

    setInterval(createHeart, 350);

}


function createHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add("falling-heart");


    const hearts = [

        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "💞"

    ];


    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";


    const duration =
        3 + Math.random() * 5;


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}