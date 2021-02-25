# txpower

Pulls power rates from power2choose. Cronable script "check.js" can be used with curl in a serverless environment. 

This example uses Twilio Functions + Sendgrid.

![Screenshot](/images/Screenshot.png)

Cron Example

`0	0,12	*	*	*	/usr/bin/curl https://XXXXX-XXXX-dev.twil.io/check`