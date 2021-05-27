import path from 'path'; 
const __dirname = path.resolve();
const notificationSound = path.join(__dirname, 'assets/notification.mp3');

import _player from 'play-sound'
const player = _player({})

export default function notify() {
    player.play(notificationSound, e => {
        if (e) {
            console.error({e})
        }
    })
}