import { I18n, LocaleNegotiator } from '@grammyjs/i18n';
import { FluentVariable } from '@grammyjs/i18n/script/src/deps';
import { Context } from 'grammy';

export function createTranslator<TContext extends Context>({
  localeNegotiator,
  globalTranslationContext,
  directory,
  defaultLocale,
}: {
  localeNegotiator: LocaleNegotiator<TContext>;
  globalTranslationContext: (ctx: TContext) => Record<string, FluentVariable>;
  defaultLocale: string;
  directory: string;
}) {
  const i18n = new I18n<TContext>({
    defaultLocale: defaultLocale,
    directory: directory,
    localeNegotiator: localeNegotiator,
    globalTranslationContext: globalTranslationContext,
  });
  return i18n;
}
