
const linkedin = require("./scrapers/linkedin");
const instagram = require("./scrapers/instagram");

module.exports = (req,res)=>{
  const {url,html} = req.body;

  if(url.includes("linkedin.com/in"))
    return res.json(linkedin(html));

  if(url.includes("instagram.com"))
    return res.json(instagram(html));

  res.status(400).json({error:"Unsupported URL"});
};
