
export const DateModal = (date) => {
    const jsDate = new Date(date);
    const month = jsDate.getMonth() + 1 > 9 ? jsDate.getMonth() + 1 : `0${jsDate.getMonth() + 1}`
    const getdate = jsDate.getDate() < 10 ? `0${jsDate.getDate()}` : jsDate.getDate();
    return `${getdate}-${month}-${jsDate.getFullYear()}`
}
