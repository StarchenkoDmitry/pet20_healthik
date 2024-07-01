import { HandlerList } from 'src/telegram/handler/handler-list';
import { GetDBRepositoryFunc, MainContext } from '../bot.interface';
import { MiddlewareFn } from 'grammy';
import { HandlerNameList } from 'src/telegram/handler/handler-name-list';
import { Repository } from 'typeorm';

export function enableExtensionContext({
  repositories,
}: {
  repositories: Repository<any>[];
}): MiddlewareFn<MainContext> {

  const getDBRepository: GetDBRepositoryFunc = (entityClass)=>{
    const repo = repositories.find((r)=>r.target === entityClass);

    if(!repo){
      throw Error(`getDBRepository: repository (${entityClass}) is not found`);
    }

    return repo;
  };

  return async (ctx, next) => {
    ctx.getDBRepository = getDBRepository;
    ctx.changeHandler = async function (name) {
      const currentHandler = ctx.session.currentHandler;

      const currentController = HandlerList.find(
        c => c.name === currentHandler,
      );

      if (currentController && currentController.process.exit) {
        await currentController.process.exit(ctx);
      }

      ctx.session.currentHandler = HandlerNameList.none;

      const nextController = HandlerList.find(c => c.name === name);

      if (nextController && nextController.process.enter) {
        await nextController.process.enter(ctx);
        ctx.session.currentHandler = name;
      } else {
        throw new Error(
          'ChangeController -> None of the controllers were found',
        );
      }
    };

    await next();
  };
}
