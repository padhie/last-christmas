const IFRAME_TEMPLATE = `<iframe src="https://www.youtube.com/embed/%VIDEO_ID%?autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`
const VIDEO_IDS = [
    'nrM1gk_yeDs',
    'IvAbKoKYTfE',
    'oo30cimBZ5Y',
];
const SNOWFLAKE_AMOUNT = 100;

let player;

function initPlayer() {
    let randomIndex = randomNumber(VIDEO_IDS.length);
    let videoId = VIDEO_IDS[randomIndex];

    let interval = setInterval(
        function () {
            try {
                player = new YT.Player('player', {
                    height: '100%',
                    width: '100%',
                    videoId: videoId,
                    autoplay: 1,
                    events: {
                        onStateChange: function(event) {
                            console.log(YT.PlayerState.ENDED);
                            console.log(event.data);
                            if (event.data === YT.PlayerState.ENDED){
                                console.log("a");
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
    let randomIndex = randomNumber(VIDEO_IDS.length);
    let videoId = VIDEO_IDS[randomIndex];
    let iframe = IFRAME_TEMPLATE.replace('%VIDEO_ID%', videoId);

    let videoWrapper = document.getElementsByClassName('video-wrapper')[0];
    // videoWrapper.innerHTML = iframe;
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