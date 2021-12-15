export class YtPlayer {
    constructor(YT, videoPlayerId, videos) {
        this.YT = YT;
        this.videoPlayerId = videoPlayerId;
        this.videos = videos;
        this.videoEndsEventCallback = (videoId) => {};

        this.lastVideoId = null;
        this.lastVideoIndex = null;
        this.player = null;
    }

    shuffleVideos() {
        this.videos = this.videos.sort(()=> Math.random() - 0.5);
    }

    setVideoEndsEventCallback(callback) {
        this.videoEndsEventCallback = callback;
    }

    init() {
        const YT = this.YT;
        const autoplay = this.autoplay;
        const videoEndsEventCallback = this.videoEndsEventCallback;
        const getNextVideoId = () => {
            return this.getNextVideoId();
        };
        const playNextVideo = (nextVideoId) => {
            this.playNextVideo(nextVideoId);
        }

        let nextVideoId = this.getNextVideoId();

        this.player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: nextVideoId ,
            events: {
                onStateChange: function(event) {
                    if (event.data === YT.PlayerState.ENDED) {
                        let nextVideoId = getNextVideoId();
                        playNextVideo(nextVideoId);

                        videoEndsEventCallback(nextVideoId);
                    }
                }
            }
        });
    }

    getNextVideoId() {
        if (this.lastVideoIndex === null || this.lastVideoIndex+1 >= this.videos.length) {
            this.lastVideoIndex = 0;
        } else {
            this.lastVideoIndex++;
        }

        this.lastVideoId = this.videos[this.lastVideoIndex];

        return this.lastVideoId;
    }

    getCurrentVideoId() {
        return this.lastVideoId;
    }


    playNextVideo() {
        let nextVideoId = this.getNextVideoId();
        this.player.loadVideoById(nextVideoId);
        this.videoEndsEventCallback(nextVideoId);
    }
}