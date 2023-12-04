export default function transformTimestamp(timestamp) {
    // Create a new Date object using the provided timestamp
    let date = new Date(timestamp);

    // Extract the individual components of the date
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based, so add 1
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    // Format the date and time as a string
    let formattedDateTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

    return formattedDateTime;
}
