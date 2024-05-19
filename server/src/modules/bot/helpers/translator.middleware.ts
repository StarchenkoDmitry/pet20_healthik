import { createTranslator } from 'src/i18n/translator';
import { MainContext } from '../bot.interface';


export const DEAFULT_LOCALE = "en";
export const DEAFULT_DIRECTORY = "src/i18n/locales/";
export const DEAFULT_FIRST_NAME = "nameless";

export function enableTranslator() {
  return createTranslator<MainContext>({
    defaultLocale: DEAFULT_LOCALE,
    directory: DEAFULT_DIRECTORY,
    globalTranslationContext(ctx) {
      // return { userFirstName: ctx.session.firstName ?? '' };
      return { userFirstName: DEAFULT_FIRST_NAME};
    },
    localeNegotiator:(ctx)=>{
      // return ctx.session.languageCode ?? DEAFULT_LOCALE;
      return DEAFULT_LOCALE;
    }
  });
}
