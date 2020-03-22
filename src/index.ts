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
interface MessageCatalogue
{
    [domain: string]: {
        [key: string]: (parameters: Record<any, any>) => string;
    };
}

/**
 *
 */
export class Translator
{
    private domain: string;
    private catalogue: MessageCatalogue = {};

    /**
     *
     */
    public constructor (defaultDomain: string = "messages")
    {
        this.domain = defaultDomain;
    }

    /**
     *
     */
    public init (catalogue: MessageCatalogue) : void
    {
        this.catalogue = catalogue;
    }


    /**
     * Translates the message with the given key, including the parameters.
     */
    public trans (key: string, parameters: TranslationParameters = {}, domain?: string) : string
    {
        domain = domain || this.domain;
        const catalogue = this.catalogue[domain] || {};

        if (catalogue[key])
        {
            return catalogue[key](parameters);
        }

        console.error(`Missing translation for '${key} (${domain})'`);
        return key;
    }
}
