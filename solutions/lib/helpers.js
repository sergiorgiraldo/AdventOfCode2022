const { position }  = require("promise-path");
const fs            = require("fs"); 
const arrays        = require("./helpers/arrays.js");
const dates         = require("./helpers/dates.js");
const math          = require("./helpers/math.js");
const objects       = require("./helpers/objects.js");
const strings       = require("./helpers/strings.js");
const processes     = require("./helpers/processes.js");
const structures    = require("./helpers/structures.js");

const fromHere      = position(__dirname); 
const debugFile     = fromHere("../../__tests__/debug.txt");

let which = {
    env_: "test",
  
    get env() {
      return `${this.env_}`;
    },
  
    set env(value) {
      this.env_ = value;
    }
  };

  function clearDebug(){
    if (which.env !== "test") return;

    if (fs.existsSync(debugFile)) fs.unlinkSync(debugFile);
  }

  function dbg(){
    if (which.env !== "test") return;

    fs.writeFileSync(debugFile, Array.from(arguments).join(" ") + "\n", {flag: "a"});
    console.log(Array.from(arguments).join(" "));
};


module.exports = {
    math, 
    strings, 
    dates, 
    arrays, 
    objects, 
    processes,
    structures,
    dbg,
    clearDebug,
    which
};