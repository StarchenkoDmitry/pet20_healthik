import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import 'dotenv/config';

const config = new ConfigService();

export const dataSource = (function () {
  const name = config.get('DATABASE_NAME');
  const host = config.get('DATABASE_HOST');
  const portRow = config.get('DATABASE_PORT');
  const username = config.get('DATABASE_USERNAME');
  const password = config.get('DATABASE_PASSWORD');

  const port = parseInt(portRow, 10);

  return new DataSource({
    type: 'postgres',
    
    database: name,

    host: host,
    port: port,

    username: username,
    password: password,

    entities: ['./src/**/*.entity.ts'],
    migrations: ['./src/migrations/*.ts'],

    synchronize: false,

    logging: true,
  });
})();
