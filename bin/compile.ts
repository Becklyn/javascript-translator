#!/usr/bin/env node

import {ObjectProperty} from "@babel/types";
const getStdin = require('get-stdin');
const {compile} = require("@lingui/cli/api/compile");
const generate = require("@babel/generator").default;
const {objectExpression, objectProperty, stringLiteral} = require("@babel/types");

interface Catalog  {
    [domain: string]: {
        [key: string]: string;
    };
}

(async () =>
{
    const input = (await getStdin()).trim();

    try
    {
        const inputCatalog: Catalog = JSON.parse(input);
        const compiledDomains: ObjectProperty[] = [];

        for (const domain in inputCatalog)
        {
            const compiledProperties: ObjectProperty[] = [];

            for (const key in inputCatalog[domain])
            {
                compiledProperties.push(objectProperty(
                    stringLiteral(key),
                    compile(inputCatalog[domain][key])
                ));
            }

            compiledDomains.push(objectProperty(
                stringLiteral(domain),
                objectExpression(compiledProperties)
            ));
        }

        const compiled = objectExpression(compiledDomains);
        console.log(
            generate(compiled, {minified: true}).code
        );
        process.exit(0);
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
})();
