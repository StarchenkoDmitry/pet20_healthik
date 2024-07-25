import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parseBoolean } from 'src/shared/utils/parser/boolean-parser';

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
        const rowLogging = config.get('DATABASE_LOGGING_IN_CONSOLE');

        const port = parseInt(portRow, 10);

        const synchronize = synchronizeRow === 'True';
        const migrationsRun = migrationsRunRow === 'True';
        const isLogging = parseBoolean(rowLogging);

        return {
          type: 'postgres',

          database: name,

          host: host,
          port: port,

          username: username,
          password: password,

          logging: isLogging,

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
