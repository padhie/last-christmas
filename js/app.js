import { Snow } from './modules/snow.js';
import { YtPlayer } from './modules/ytPlayer.js';

const SNOWFLAKE_WRAPPER_ID = 'snowflakes-wrapper';
const SNOWFLAKE_AMOUNT = 100;

const YOUTUBE_LINK_TEMPLATE = `<a href='https://youtu.be/%VIDEO_ID%' target='_blank'>%VIDEO_ID%</a>`;
const PLAYER_ID = 'player';
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
    'w4RCuwRFa4M',
    'jQDy8yuhcao',
    'FZFhKixAPTQ',
    'vbdm60hA2Qg',
    'dv4EMUI_Zd8',
];

export class App {
    constructor(YT) {
        this.YT = YT;
    }

    run() {
        this.startSnow();
        this.startYtPlayer();
    }

    startSnow() {
        console.info('start snowflakes');
        const snow = new Snow(
            document.getElementById(SNOWFLAKE_WRAPPER_ID),
            SNOWFLAKE_AMOUNT
        );
        snow.init();
    }

    startYtPlayer() {
        console.info('start yt player');

        const videoEndsEventCallback = (nextVideoId) => {
            document.getElementById('current-song').innerHTML = YOUTUBE_LINK_TEMPLATE.replaceAll('%VIDEO_ID%', nextVideoId);
        };
        const ytPlayer = new YtPlayer(this.YT, PLAYER_ID, VIDEOS);

        ytPlayer.shuffleVideos();
        ytPlayer.setVideoEndsEventCallback(videoEndsEventCallback);
        ytPlayer.init();

        document.getElementById('songs-amount').innerHTML = VIDEOS.length;
        videoEndsEventCallback(ytPlayer.getCurrentVideoId());

        document.getElementById('next-video-button').addEventListener('click', () => {
            ytPlayer.playNextVideo();
        });

    }
}
