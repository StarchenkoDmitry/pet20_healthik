import { HandlerNameList, HandlerNamesType } from "src/telegram/handler/handler-name-list";

export const DEFAULT_I18N_LANGUAGE_CODE = 'en';
export const DEFAULT_I18N_DIRECTORY = 'src/i18n/locales/';
export const DEFAULT_I18N_FIRST_NAME = 'nameless';

export const DEFAULT_HANDLER_NAME_ON_INITIALIZATION:HandlerNamesType = HandlerNameList.none;
export const DEFAULT_HANDLER_NAME_AFTER_START:HandlerNamesType = HandlerNameList.mainMenu;
export const DEFAULT_HANDLER_NAME:HandlerNamesType = HandlerNameList.mainMenu;
