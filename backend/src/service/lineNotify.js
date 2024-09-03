const axios = require('axios');
const qs = require('qs');
require("dotenv").config();

async function notifyLine(message) {
    let data = qs.stringify({
        'message': message
    });
    const accessToken = process.env.LINE_TOKEN;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${accessToken}`
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}

module.exports = { notifyLine };
