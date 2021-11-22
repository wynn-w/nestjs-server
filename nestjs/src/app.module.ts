import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DemoModule } from './demo/demo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
import { UsersModule } from './user/user.module';
@Module({
  imports: [
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
  // constructor(private readonly connection: Connection) { }
}
