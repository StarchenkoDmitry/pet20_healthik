import { HandlerDescriptionType } from '../handler.interface';

export function checkDuplicateHandlerNames(
  handlerList: HandlerDescriptionType[],
) {
  const end = handlerList.length;

  for (let i = 0; i < end; i++) {
    const current = handlerList[i];
    
    for (let n = i + 1; n < end; n++) {
      const next = handlerList[n];

      if (current.name === next.name) {
        throw Error(`duplicate found ${current.name},${next.name}`);
      }
    }
  }
}
