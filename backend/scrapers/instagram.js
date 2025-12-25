
const cheerio = require("cheerio");

module.exports = (html)=>{
  const $ = cheerio.load(html);
  return {
    platform:"instagram",
    data:{
      username:$("header h2").first().text().trim()||null,
      bio:$("header section span").first().text().trim()||null
    }
  };
};
