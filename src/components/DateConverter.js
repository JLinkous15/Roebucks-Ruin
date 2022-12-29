export const DateConverter = ({date}) => {
    const newDate = new Date(date)

    return newDate.toUTCString()
}