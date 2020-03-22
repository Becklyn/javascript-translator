#!/usr/bin/env node

const getStdin = require('get-stdin');
const MessageFormat = require("messageformat");


(async () =>
{
    const input = (await getStdin()).trim();
    let rawCatalog;

    try
    {
        rawCatalog = JSON.parse(input);
    }
    catch (e)
    {
        console.error(`Parsing the JSON failed: ${e.message}`);
        console.error(e);
        console.error("");
        console.error("Input was:");
        console.error(input);
        process.exit(1);
    }

    try
    {
        const messageFormat = new MessageFormat("de");
        const catalogue = messageFormat.compile(rawCatalog, "de");

        // the only way to get our desired output format is if a dot is in the `global` name.
        // So we use a object with a property.
        console.log(`(function(){ 
var r = {a: {}};
${catalogue.toString("r.a")};
return r.a;
})()`);

        process.exit(0);
    }
    catch (e)
    {
        console.error(`Compiling the catalogue failed: ${e.message}`);
        console.error(e);
        console.error("");
        process.exit(1);
    }
})();
