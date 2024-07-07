import { CommandContext } from 'grammy';
import { MainContext } from '../bot.interface';
import { 
  DEFAULT_HANDLER_NAME, 
  DEFAULT_I18N_LANGUAGE_CODE 
} from 'src/config/bot';


export async function restartCommand(ctx: CommandContext<MainContext>) {
  if(!ctx.from){ return; }
  
  ctx.session.id = ctx.from.id.toString();
  ctx.session.firstName = ctx.from.first_name;
  ctx.session.languageCode = ctx.from.language_code ?? DEFAULT_I18N_LANGUAGE_CODE;
  ctx.i18n.useLocale(ctx.session.languageCode);

  await ctx.reply(ctx.t("restart"));

  await ctx.changeHandler(DEFAULT_HANDLER_NAME);
}
