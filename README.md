Symfony JavaScript Translator
=============================

This is a modern implementation of the JS translator to translate Symfony's translation messages.
Best to be used with the [translation bundle](https://github.com/Becklyn/translations-bundle).


Initialization
--------------

For example like this (using `mojave`):

```js
import {initFromGlobalData} from "mojave/init"; 
import {Translator} from "@becklyn/translator";

let translator = initFromGlobalData("TranslatorInit", new Translator());
```


A manual way to wire it up to global data is like this: 

```js
function loadGlobalData (key, handler)
{
    if (undefined === window[key])
    {
        return;
    }

    // replace global callback
    window[key].init = (data) => handler.init(data);
    // handle current data
    handler.init(window[key].data);
}

let translator = new Translator();
loadGlobalData("TranslatorInit", translator);
```
