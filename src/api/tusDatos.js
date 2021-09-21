import axios from 'axios'
/* const username = "sosorno@isciolab.com";
const password = "Telmo2021";
const idToken =
    "Basic " + Buffer.from(username + ":" + password).toString("base64"); */
export default axios.create({
    baseURL: 'https://dash-board.tusdatos.co/api',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})