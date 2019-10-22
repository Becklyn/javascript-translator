import {I18n, setupI18n} from "@lingui/core";

/**
 * Possible values for translation parameters
 */
interface TranslationParameters
{
    [key: string]: string|number|null|undefined;
}

/**
 * Data structure for initializing the translator
 */
interface InitCatalogue
{
    [domain: string]: {
        [key: string]: string;
    };
}

/**
 *
 */
export class Translator
{
    private domain: string;
    private i18n: I18n;

    /**
     *
     */
    public constructor (defaultDomain: string = "messages")
    {
        this.domain = defaultDomain;
        this.i18n = setupI18n({
            language: "all",
            catalogs: {
                all: {
                    messages: {},
                },
            },
            missing(language: string, id: string)
            {
                console.error(`Missing translation for '${id}'`);
                return id;
            }
        });
    }

    /**
     *
     */
    public init (catalogue: InitCatalogue) : void
    {
        let messages: {[key: string]: string} = {};

        for (let domain in catalogue)
        {
            for (let key in catalogue[domain])
            {
                messages[`${domain}::${key}`] = catalogue[domain][key];
            }

        }

        this.i18n.load({
            all: {messages},
        });
    }

    /**
     * Translates the message with the given key, including the parameters.
     */
    public trans (key: string, parameters: TranslationParameters = {}, domain?: string) : string
    {
        return this.i18n._(`${domain || this.domain}::${key}`, parameters);
    }
}
