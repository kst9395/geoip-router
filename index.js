const express = require('express')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const env = (name) => process.env[name];

const app = express();


async function getCountry(ip) {
    try {
        const response = await fetch(`https://get.geojs.io/v1/ip/country/${ip}.json`);
        if (response.ok) {
            const body = await response.json()
            return body.country || undefined;
        }
    } catch (error) {
        console.error('failed to request geojs', error)
        return undefined;
    }
};

const geoip = async (req, res, next) => {
    try {
        if (req.path == '/') {
            const country = await getCountry(req.ip);
            if (!country) {
                console.log('no country for ip:' + req.ip)
                next();
                return;
            }
            if (country == 'PT' || country == 'BR') {
                res.redirect('/pt')
                return;
            } else {
                res.redirect("/en")
                return;
            }
        }
        next();
    } catch (error) {
        console.error(error);
        next();
    }
}

app.use(geoip);

app.use(express.static(env('STATIC_FOLDER')))


app.listen(env('PORT'), () => console.log('listening on port ', env('PORT')))
