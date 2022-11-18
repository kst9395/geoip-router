const config = require('dotenv').config().parsed;
const express = require('express');
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
const client = new WebServiceClient(config.MAXMIND_ACCOUNT_ID, config.MAXMIND_LICENSE_KEY, { host: 'geolite.info' });

const app = express();

const port = 8080;

app.use(async (req, res, next) => {
    try {
        const response = await client.country(req.ip);
        const isoCode = response.country.isoCode;
        console.log('request from:', isoCode);
        next();
    } catch (error) {
        console.error(error);
        next();
    }
});

app.use(express.static('public'));

app.listen(port, () => console.log("server started"));