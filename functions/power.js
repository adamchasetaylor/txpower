const axios = require('axios');
const data =
  '{"parameters":{"method":"plans","zip_code":"75081","company_tdu_id":"","company_unique_id":"","plan_mo_from":"","plan_mo_to":"","estimated_use":1000,"plan_type":"1","rating_total":"","include_details":true,"language":0,"min_usage_plan":"off"}}';

const config = {
  method: 'post',
  url: 'http://www.powertochoose.org/en-us/service/v1/',
  headers: {
    Connection: 'keep-alive',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    Accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4412.0 Safari/537.36 Edg/90.0.796.0',
    'Content-Type': 'application/json; charset=UTF-8',
    Origin: 'http://www.powertochoose.org',
    Referer: 'http://www.powertochoose.org/en-us/Plan/Results',
    'Accept-Language': 'en-US,en;q=0.9',
    Cookie: 'PowerToChoose.CurrentLanguage=en-US',
  },
  data: data,
};

exports.handler = function (context, event, callback) {
  axios(config)
    .then(function (response) {
      plans = [];

      for (const plan of response.data) {
        const { company_name, company_logo, go_to_plan, plan_name, price_kwh1000, term_value } = plan;

        //add these to my plans
        plans.push({
          company_name,
          company_logo,
          go_to_plan,
          plan_name,
          price: price_kwh1000,
          term_value,
        });
      }

      plans.sort((a, b) => {
        return a.price - b.price;
      });

      //return top 5 plans
      callback(null, plans.slice(0, 5));
    })
    .catch(function (error) {
      callback(error, null);
    });
};
