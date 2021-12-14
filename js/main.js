const VIDEO_IDS = [
    'nrM1gk_yeDs',
    'IvAbKoKYTfE',
    'oo30cimBZ5Y',
];
const SNOWFLAKE_AMOUNT = 100;

let lastVideoId = null;
let player;

function initPlayer() {
    let interval = setInterval(
        function () {
            try {
                player = new YT.Player('player', {
                    height: '100%',
                    width: '100%',
                    videoId: nextRandomVideo(),
                    autoplay: 1,
                    events: {
                        onStateChange: function(event) {
                            if (event.data === YT.PlayerState.ENDED){
                                player.loadVideoById(nextRandomVideo());
                            }
                        }
                    }
                });
            } catch (exception) {
            } finally {
                if (typeof player !== 'undefined') {
                    clearInterval(interval);
                }
            }
        },
        100
    );
}

function randomNumber (max) {
    return Math.floor(Math.random() * max)
}

function nextRandomVideo () {
    let nextVideoId = null;

    do {
        let randomIndex = randomNumber(VIDEO_IDS.length);
        nextVideoId = VIDEO_IDS[randomIndex];
    } while(lastVideoId !== null && nextVideoId === lastVideoId);

    lastVideoId = nextVideoId;

    return lastVideoId;
}

function initSnow () {
    let wrapper = document.getElementById('snowflakes-wrapper');

    for (let i=0; i<SNOWFLAKE_AMOUNT; i++) {
        let left = (randomNumber(98) + 1);
        let delayOne = randomNumber(100) / 10;
        let delayTwo = randomNumber(100) / 10;

        let snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = left + '%';
        snowflake.style.animationDelay = delayOne + 's, ' + delayTwo + 's';
        snowflake.style.webkitAnimationDelay = delayOne + 's, ' + delayTwo + 's';;
        snowflake.innerHTML = '❆';
        wrapper.appendChild(snowflake);
    }
}

(function() {
    initSnow();

    setTimeout(initPlayer, 100);

    document.getElementById('random-video-button').addEventListener('click', () => {
        nextRandomVideo();
    });
})();