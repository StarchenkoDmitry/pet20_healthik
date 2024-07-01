export const HandlerNameList = {
  none: "none",
  mainMenu: 'main-menu',

  languageSettings: 'language-settings',
  feedback: 'feedback',
} as const;

export type HandlerNamesType = typeof HandlerNameList[keyof typeof HandlerNameList];
