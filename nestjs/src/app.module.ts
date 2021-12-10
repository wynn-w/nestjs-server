import { join } from 'path';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DemoModule } from './demo/demo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
import { UsersModule } from './user/user.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs_test',
      synchronize: true,
      autoLoadEntities: true,
    }),
    DemoModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    this.init();
  }
  init() {
    console.log(process.env['NODE_ENV']);
  }
  // constructor(private readonly connection: Connection) { }
}
