const getDate = (timestamp: any) => {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // "YYYY-MM-DD" 형식의 날짜 출력
    return formattedDate;
};

const getDateWithTime = (timestamp: any) => {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
};

export { getDate, getDateWithTime };
