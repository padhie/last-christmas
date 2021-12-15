const SNOWFLAKE_AMOUNT = 100;
const YOUTUBE_LINK_TEMPLATE = `<a href='https://youtu.be/%VIDEO_ID%' target='_blank'>%VIDEO_ID%</a>`;
const VIDEOS = [
    'nrM1gk_yeDs',
    'IvAbKoKYTfE',
    'GOFEEp4JJSo',
    'oo30cimBZ5Y',
    'zUjf78p92WI',
    'scfGR7sY1Cs',
    'XurfvD1kmQA',
    'gvd_rqU3lm8',
    'e5M52XdmdXc',
    'xSAIXAcdcS0',
    '-TrZUyevOsU',
    'eo9sUiS4Z-g',
    '1nFbWmEHNUA',
    'Nax-BqIbSnY',
    '_OjS5aRCrEQ',
    'gZnIi1MbqnI',
    'QWIaAbh4bLk',
    'xWGIaJLz9dg',
    'cEy6VCBtALs',
    't3iqo72Dfow',
    '0SZkDJItgK8',
    '-cJzVRP3MjY',
].sort(()=> Math.random() - 0.5);


let lastVideoIndex = -1;
let player;
let errors = [];

function initPlayer() {
    if (document.getElementById('player') === undefined) {
        return;
    }

    let interval = setInterval(
        function () {
            try {
                let nextVideoId = getNextVideoId();
                updateStatistic(nextVideoId);

                player = new YT.Player('player', {
                    height: '100%',
                    width: '100%',
                    videoId: nextVideoId ,
                    autoplay: 1,
                    events: {
                        onStateChange: function(event) {
                            if (event.data === YT.PlayerState.ENDED) {
                                if (document.getElementById('autoplay').checked) {
                                    playNextVideo(getNextVideoId());
                                }
                            }
                        }
                    }
                });
            } catch (exception) {
                errors.push(exception);
            } finally {
                if (typeof player !== 'undefined') {
                    clearInterval(interval);
                    setTimeout(() => {player.playVideo()}, 1000);
                }
            }
        },
        100
    );
}

function randomNumber (max) {
    return Math.floor(Math.random() * max)
}

function getNextVideoId () {
    if (lastVideoIndex+1 >= VIDEOS.length) {
        lastVideoIndex = 0;
    } else {
        lastVideoIndex++;
    }

    return VIDEOS[lastVideoIndex];
}

function playNextVideo(videoId) {
    updateStatistic(videoId);
    player.loadVideoById(videoId);
}

function updateStatistic(videoId) {
    document.getElementById('current-song').innerHTML = YOUTUBE_LINK_TEMPLATE.replaceAll('%VIDEO_ID%', videoId);
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
        snowflake.style.webkitAnimationDelay = delayOne + 's, ' + delayTwo + 's';
        snowflake.innerHTML = '❆';
        wrapper.appendChild(snowflake);
    }
}

function printErrors() {
    for (let i=0; i<errors.length; i++) {
        console.error(errors[i]);
    }
}

(function() {
    document.getElementById('songs-amount').innerHTML = VIDEOS.length;
    initSnow();
    setTimeout(initPlayer, 100);

    document.getElementById('random-video-button').addEventListener('click', () => {
        let videoId = getNextVideoId();
        playNextVideo(videoId);
    });
})();