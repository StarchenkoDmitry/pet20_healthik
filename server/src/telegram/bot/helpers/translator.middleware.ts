import { createTranslator } from 'src/i18n/translator';
import { MainContext } from '../bot.interface';
import { 
  DEFAULT_I18N_DIRECTORY, 
  DEFAULT_I18N_FIRST_NAME, 
  DEFAULT_I18N_LANGUAGE_CODE 
} from 'src/config/bot';


export function enableTranslator() {
  return createTranslator<MainContext>({
    defaultLocale: DEFAULT_I18N_LANGUAGE_CODE,
    directory: DEFAULT_I18N_DIRECTORY,
    globalTranslationContext(ctx) {
      return { ctx_firstName: ctx.session.firstName ?? DEFAULT_I18N_FIRST_NAME };
    },
    localeNegotiator:(ctx)=>{
      return ctx.session.languageCode ?? DEFAULT_I18N_LANGUAGE_CODE;
    }
  });
}
