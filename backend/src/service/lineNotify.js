const axios = require('axios');
const querystring = require('querystring');

exports.notifyLine = async (message) => {
    const accessToken = 'C4sV5dee5VvTHgAV7qBh61Xf8tBVdYKCoFUlQo4iZhS';

    try {
        const response = await axios({
            method: 'POST',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`,
            },
            data: querystring.stringify({ message })
        });
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};
 