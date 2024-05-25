import { HandlerNameList } from './handler-name-list';
import { HandlerDescriptionType } from './handler.interface';
import { LanguageSettingsHandler } from './handlers/LanguageSettings';
import { MainMenuHandler } from './handlers/MainMenu';
import { checkDuplicateHandlerNames } from './helpers/chack';


export const HandlerList: HandlerDescriptionType[] = [
  {
    name: HandlerNameList.languageSettings,
    process: LanguageSettingsHandler,
  },
  {
    name: HandlerNameList.mainMenu,
    process: MainMenuHandler,
  },
] as const;

//protection
checkDuplicateHandlerNames(HandlerList);
