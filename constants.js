// I've put this in its own file so it's easier to use in the main app file and the router for the index page

var fs = require("fs");

const prefixes = ["Re", "Un", "De", "Dis"];
const suffixes = ["icated", "ified", "ity", "ness", "ify"];
const skins = fs.readdirSync("public/images");

module.exports = {prefixes: prefixes, suffixes:suffixes, skins:skins};