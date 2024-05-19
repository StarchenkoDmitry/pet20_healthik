import { I18nFlavor } from "@grammyjs/i18n";
import { Context, SessionFlavor } from "grammy";

export type MainContext = Context 
    & I18nFlavor 
    & SessionFlavor<{
        firstName:string;
        languageCode:string;
    }>;