import { sequentialize } from "@grammyjs/runner";
import { MiddlewareFn } from "grammy";
import { MainContext } from "../bot.interface";

export function enableSequentionlize(): MiddlewareFn<MainContext> {
    return sequentialize<MainContext>(ctx => {
      return ctx.from?.id.toString();
    });
}