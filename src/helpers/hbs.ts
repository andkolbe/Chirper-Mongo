import moment from 'moment';

export const formatDate = (date: Date, format: string) => {
    return moment(date).format(format)
}

export const editIcon = (chirpUser: any, loggedUser: any, chirpId: any) => {
    if (chirpUser._id.toString() == loggedUser._id.toString()) {
        return `<a class="btn text-success font-weight-bold" href={'/chirps/edit/${chirpId}'}>Edit Chirp</a>`
    } else {
        return ''
    }
}
