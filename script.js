document.addEventListener('DOMContentLoaded', (event) => {
    initializeTelegram();
//        fetchPointsFromServer();

});

document.getElementById('spinButton').addEventListener('click', spinReels);

let points = 0;
let telegramId = null;
let test = 909;
//let telegramId = 987654323;
//let telegramId = 'Test2'

function initializeTelegram() {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

        document.getElementById('version').textContent = 909;


    const user = tg.initDataUnsafe.user;
    if (user) {
//        telegramId = Number(user.id);
//        telegramId = '' + user.id;
/*
        telegramId = alert(typeof user.id.toString());
        telegramId = user.id.toString();
        alert(typeof telegramId);
*/
	alert(typeof user.id);
        telegramId = alert(typeof test.toString());
        telegramId = test.toString();
        alert(typeof telegramId);

//        telegramId = String(test);
//        telegramId = user.id;
//        document.getElementById('telegramId').textContent = telegramId;
        document.getElementById('telegramId').textContent = telegramId;
        fetchPointsFromServer();
    } else {
//        telegramId = String(test);
        telegramId = alert(typeof test.toString());
        telegramId = test.toString();
        alert(typeof telegramId);
//        telegramId = '' + test;
        document.getElementById('telegramId').textContent = telegramId;
//        document.getElementById('telegramId').textContent = 'Not available';
    }
}

function fetchPointsFromServer() {
    if (!telegramId) return;

//    fetch('http://192.168.0.102:49450/get_points', {
//    fetch('http://e73398b2546c.vps.myjino.ru:49450/get_points', {

    fetch('http://81.177.165.117:49450/get_points', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegram_id: telegramId })
    })
    .then(response => response.json())
    .then(data => {
        points = data.points;
        document.getElementById('points').textContent = points;
    })
    .catch((error) => {
        console.error('Error fetching points:', error);
    });
}


/*
function fetchPointsFromServer() {
    fetch('http://192.168.0.102:3000/get_points')
        .then(response => response.json())
        .then(data => {
            points = data.points;
            document.getElementById('points').textContent = points;
        })
        .catch((error) => {
            console.error('Error fetching points:', error);
        });
}
*/

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
//        if (reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol) {
        if (reel1Symbol === reel1Symbol) {
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

//    if (!telegramId) return;


// console.log(`telegramId:${telegramId}`);
// console.log(`telegramId:`);
//        document.getElementById('telegramId').textContent = telegramId;

        alert(typeof telegramId);
        alert(telegramId);



//    fetch('http://192.168.0.102:49450/update_points', {
//    fetch('http://e73398b2546c.vps.myjino.ru:49450/update_points', {
    fetch('http://81.177.165.117:49450/update_points', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
//        body: JSON.stringify({ points: points })
        body: JSON.stringify({ telegram_id: telegramId, points: points })
        , referrerPolicy: "unsafe-url" 

    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
	alert(data);
    })
    .catch((error) => {
        console.error('Error:', error);
	alert(error);
    });
}
