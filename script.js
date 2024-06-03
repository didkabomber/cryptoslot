document.addEventListener('DOMContentLoaded', (event) => {
    fetchPointsFromServer();
    initializeTelegram();
});

document.getElementById('spinButton').addEventListener('click', spinReels);

let points = 0;

function fetchPointsFromServer() {
    fetch('http://localhost:3000/get_points')
        .then(response => response.json())
        .then(data => {
            points = data.points;
            document.getElementById('points').textContent = points;
        })
        .catch((error) => {
            console.error('Error fetching points:', error);
        });
}

function spinReels() {
    const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓', '⭐'];
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
    const result = document.getElementById('result');
    const pointsDisplay = document.getElementById('points');

    // Remove existing animations
    reel1.classList.remove('spin');
    reel2.classList.remove('spin');
    reel3.classList.remove('spin');

    // Force reflow to restart the animation
    void reel1.offsetWidth;
    void reel2.offsetWidth;
    void reel3.offsetWidth;

    // Add spin animation
    reel1.classList.add('spin');
    reel2.classList.add('spin');
    reel3.classList.add('spin');

    // Randomly select a symbol for each reel after animation duration
    setTimeout(() => {
        const reel1Symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const reel2Symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const reel3Symbol = symbols[Math.floor(Math.random() * symbols.length)];

        // Update the UI with the new symbols
        reel1.textContent = reel1Symbol;
        reel2.textContent = reel2Symbol;
        reel3.textContent = reel3Symbol;

        // Determine if the player has won and update points
        if (reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol) {
            result.textContent = 'You Win!';
            result.style.color = 'green';
            points += 10; // Add points for a win

            // Send updated points to the server
            sendPointsToServer(points);
        } else {
            result.textContent = 'Try Again!';
            result.style.color = 'red';
        }

        // Update points display
        pointsDisplay.textContent = points;
    }, 1000); // Match the timeout with animation duration
}

function sendPointsToServer(points) {
    fetch('http://localhost:3000/update_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: points })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function initializeTelegram() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const user = tg.initDataUnsafe.user;
    if (user) {
        document.getElementById('telegramId').textContent = user.id;
    } else {
        document.getElementById('telegramId').textContent = 'Not available';
    }
}
