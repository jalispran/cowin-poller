const pincodes = [431001, 431002, 431003, 431004, 431005, 431006]
const minAgeLimit = 45

export default class Extractor {

    constructor(idx, center, session) {
        this.idx = idx
        this.center_id = center.center_id
        this.min_age_limit = session.min_age_limit
        this.available_capacity = session.available_capacity
        this.dose_one_availability = session.available_capacity_dose1
        this.dose_two_availability = session.available_capacity_dose2
        this.date = session.date
        this.center_name = center.name
        this.address = center.address
        this.pincode = center.pincode
        this.vaccine_name = session.vaccine
        this.fee_type = center.fee_type
    }

    dataForPresenter() {
        if (this.available_capacity <= 0) {
            return []
        }

        if (!pincodes.includes(this.pincode)) {
            return []
        }

        if (this.min_age_limit !== minAgeLimit) {
            return []
        }

        return [`${this.idx}`, 
            `${this.center_id}`, 
            `${this.min_age_limit}`, 
            `${this.available_capacity}`,
            `${this.dose_one_availability}`,
            `${this.dose_two_availability}`,
            `${this.date}`,
            `${this.center_name}`,
            `${this.address}`,
            `${this.pincode}`,
            `${this.vaccine_name}`,
            `${this.fee_type}`,
        ]
    }
}