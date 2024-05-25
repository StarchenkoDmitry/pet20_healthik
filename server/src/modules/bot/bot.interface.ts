import { I18nFlavor } from "@grammyjs/i18n";
import { Context, SessionFlavor } from "grammy";
import { TelegramUser } from "../telegram-user/telegram-user.entity";
import { ObjectLiteral, Repository } from "typeorm";
import { HandlerNamesType } from "../handler/handler-name-list";


export type GetDBRepositoryFunc = <T extends ObjectLiteral>(entityClass: ObjectLiteral) => Repository<T>;
export type ChangeHandlerFunc = (name: HandlerNamesType)=>Promise<void>;

export type ExtensionContext = {
  changeHandler: (name: HandlerNamesType)=>Promise<void>;
  getDBRepository: GetDBRepositoryFunc;
}

export type MainContext = Context 
  & I18nFlavor
  & SessionFlavor<TelegramUser> 
  & ExtensionContext;
