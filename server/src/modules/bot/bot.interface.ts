import { I18nFlavor } from "@grammyjs/i18n";
import { Context, SessionFlavor } from "grammy";
import { TelegramUser } from "../telegram-user/telegram-user.entity";

export type MainContext = Context 
    & I18nFlavor 
    & SessionFlavor<TelegramUser>;