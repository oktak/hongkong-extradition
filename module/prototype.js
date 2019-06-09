const request = require("request");
const querystring = require("querystring");

let tags_pool = [
  "逃犯條例",
  "送中條例",
  "引渡",
  "陳同佳",
  "移交",
  "移送",
  "修訂草案",
  "司法管轄權",
  "反對修訂",
  "黑衣遊行",
  "刑事事宜相互法律協助",
  "堵塞漏洞",
  "聯校聯署"
];

// let tags_pool = ["送中條例"];

let protect_esc = "])}while(1);</x>";

let obj = [];
async function callurl() {
  await tags_pool.forEach(async tag => {
    let url =
      `https://medium.com/_/api/tags/` + querystring.escape(tag) + `/stream`;

    console.log(url);
    await request(
      {
        url: url
      },
      async function(error, response, body) {
        if (!error && response.statusCode === 200) {
          body = body.replace(protect_esc, "");
          const json = JSON.parse(body);

          if (json["payload"]["streamItems"].length > 0) {
            let arr = Object.keys(json["payload"]["references"]["Post"]);

            arr.forEach(id => {
              obj.push({
                title: json["payload"]["references"]["Post"][id]["title"],
                url: `https://medium.com/p/${id}`
              });
            });
            // console.log(obj);
          }
        }
      }
    );

    // console.log(url);
  });
}

callurl();
console.log(obj);
