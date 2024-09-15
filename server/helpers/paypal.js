const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AULsA5D7jw0Myds84bFDkSbvNK-eLYBhYu1WGXA9I9jAvLHXZAVfPPIunPmi7P1iQVKTvOkfJd2pieC6",
  client_secret:
    "EJRbEXwr1nJe4q9OkmX83rAjnBtPqShc17g8Nh21Jmjr6PPUc_geALYYocAYn0myv0BAGsnU5xu8BL5x",
});

module.exports = paypal;
