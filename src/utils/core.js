import dayjs from 'dayjs';

const adjustDateTimeForTimezone = (dateString) => {
    if (!dateString) return new Date().toDateString();

    const dateUTC = dayjs.utc(dateString);
    const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');

    return dayjs(dateInUTCMinus.format());
};

const calculateDuration = (startDate, type) => {
    const today = dayjs().startOf('day');
    const startUtc = dayjs.utc(startDate);

    switch(type) {
        case "days":
        return dayjs.duration(today - startUtc).asDays();

        case "hours":
        return dayjs.duration(today - startUtc).asHours();

        default:
        return dayjs.duration(today - startUtc).asMinutes();
    }
}

const handleChange = (data, setData, value, field) => {
    const d = data;
    d[field].value = value
    setData(() => ({
        ...d
    }));
}

const getUser = () => {
    const user = localStorage.getItem("session");
    if(user) {
        return JSON.parse(user).user
    }
    return null;
}


export {
    handleChange,
    adjustDateTimeForTimezone,
    getUser,
    calculateDuration
}