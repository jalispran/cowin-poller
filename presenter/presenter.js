import {markdownTable} from 'markdown-table'
import chalk from 'chalk'

const header = ['No', 'Center ID', 'Age Limit', 'Total Available', 'Dose 1', 'Dose 2', 'Date', 'Center Name', 'Address', 'Pincode', 'Vaccine', 'Fee']

export default function present(aray) {

    let data = aray.map(element => {
        return element.dataForPresenter()
    });

    data = data.filter(e => e.length > 0)

    data = [header, ...data]

    let table = markdownTable(data)

    console.log(table)

    console.log()
    console.log()
    console.log()
    console.log()
    
}