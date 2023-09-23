import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const SI_TIME = "videoplayer-current-time";

player.on('timeupdate', throttle(setTime, 1000));

let time = localStorage.getItem(SI_TIME);

if (time !== null) {
    player.setCurrentTime(time);
}

function setTime({ seconds }) {
    localStorage.setItem(SI_TIME, seconds);
}