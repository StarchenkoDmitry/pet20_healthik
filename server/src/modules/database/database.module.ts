import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const name = config.get('DATABASE_NAME');
        const host = config.get('DATABASE_HOST');
        const portRow = config.get('DATABASE_PORT');
        const username = config.get('DATABASE_USERNAME');
        const password = config.get('DATABASE_PASSWORD');
        const synchronizeRow = config.get('DATABASE_SYNCHRONIZE');
        const migrationsRunRow = config.get('DATABASE_MIGRATIONS_RUN');

        const port = parseInt(portRow, 10);

        const synchronize = synchronizeRow === 'True';
        const migrationsRun = migrationsRunRow === 'True';

        return {
          type: 'postgres',

          database: name,

          host: host,
          port: port,

          username: username,
          password: password,

          logging: true,

          synchronize: synchronize,
          migrationsRun: migrationsRun,

          entities: ['./**/*.entity.js'],
          migrations: ['./**/migrations/*.js'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
