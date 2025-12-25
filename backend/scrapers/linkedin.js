
const cheerio = require("cheerio");

module.exports = (html)=>{
  const $ = cheerio.load(html);
  return {
    platform:"linkedin",
    data:{
      name:$("h1.text-heading-xlarge").first().text().trim()||null,
      headline:$("div.text-body-medium").first().text().trim()||null
    }
  };
};
