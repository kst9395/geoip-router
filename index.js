const config = require('dotenv').config().parsed;
const express = require('express');
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
//third parameter can be ommited if subscribe to premium geoip2 service
const client = new WebServiceClient(config.MAXMIND_ACCOUNT_ID, config.MAXMIND_LICENSE_KEY, { host: 'geolite.info' });

const app = express();

const port = config.PORT;

app.use(async (req, res, next) => {
    try {
        //let say the static site is with format of /<launguage>/content   
        if (req.url.startsWith("/en")) {
            // custom redirect logic can be implemented here
            const response = await client.country(req.ip);
            const isoCode = response.country.isoCode;
            console.log('request from:', isoCode);
            if (isoCode === 'BRA') {
                //redirect brazil traffic to view portuguese version of the page by default
                res.redirect(req.url.replace("/en", "/pt"));
                return;
            }
        }
        //fallback to static middleware
        next();
    } catch (error) {
        console.error(error);
        //in case error calling geolite api
        next();
    }
});

app.use(express.static(config.STATIC_PATH));

app.listen(port, () => console.log("server started"));