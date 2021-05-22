import path from 'path'; 
const __dirname = path.resolve();
const notificationSound = path.join(__dirname, 'assets/notification.mp3');

import _player from 'play-sound'
const player = _player({})

import {markdownTable} from 'markdown-table'


const header = ['No', 'Center ID', 'Age Limit', 'Total Available', 'Dose 1', 'Dose 2', 'Date', 'Center Name', 'Address', 'Pincode', 'Vaccine', 'Fee']

export default function present(aray) {

    let data = aray.map(element => {
        return element.dataForPresenter()
    });

    data = data.filter(e => e.length > 0)
    
    if (data.length > 0) {
        player.play(notificationSound, e => {
            if (e) {
                console.error({e})
            }
        })
    }

    data = [header, ...data]

    let table = markdownTable(data)

    console.clear()
    console.log(table)
}