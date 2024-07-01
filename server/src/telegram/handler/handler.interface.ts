import { MainContext } from "../bot/bot.interface";
import { Filter } from "grammy";
import { HandlerNamesType } from "./handler-name-list";


export type HandlerFucnReturn = boolean | void | undefined;

export type MessageHandlerFunc = (ctx: Filter<MainContext, "message">) => Promise<HandlerFucnReturn> | HandlerFucnReturn;
export type EntryHandlerFunc = (ctx: MainContext) => Promise<void> | void;
export type ExitHandlerFunc = (ctx: MainContext) => Promise<void> | void;

export type HandlerType = {
  readonly messageHandler: MessageHandlerFunc;
  readonly enter?: EntryHandlerFunc;
  readonly exit?: ExitHandlerFunc;
};

export type HandlerDescriptionType = {
  readonly name: HandlerNamesType;
  readonly isDefault?: boolean;
  readonly process: HandlerType;
}
