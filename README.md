# ExpressJS middleware app to redirect request to other url based on country code
This application uses MaxMind GeoLite database to detect request location.

## Getting started
Register a free account from [MaxMind official account](https://www.maxmind.com/). 
You should be able to create a license key in `Manage License Key` > `Generate new license key`
Create a `.env` in the project directory.
add 
`MAXMIND_ACCOUNT_ID=<your account id>`
`MAXMIND_LICENSE_KEY=<your license key>`
`STATIC_PATH=<your static file path>`
`PORT=<your node server port>`

