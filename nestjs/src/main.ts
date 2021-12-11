import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/server.config';
import { MSwagger } from './plugin/swagger';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  new MSwagger(app);
  await app.listen(PORT);
  Logger.warn(`server run in ${PORT}...`);
}
bootstrap();

// ==============================================
// https + http

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { PORT } from './config/server.config';
// import { MSwagger } from './plugin/swagger';
// // import { Logger } from '@nestjs/common';

// import * as fs from 'fs';
// import express from 'express';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as http from "http";
// import * as https from "https";

// async function bootstrap() {
//   const server = express();
//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(server)
//     // , {
//     //   logger: ['error', 'warn', 'log'],
//     //  }
//   );
//   await app.init();
//   new MSwagger(app);
//   const httpsOptions = {
//   key: await fs.promises.readFile('src/6751014_www.showmecode.tech.key'),
//   cert: await fs.promises.readFile('src/6751014_www.showmecode.tech.pem'),
//   };
//   https.createServer(httpsOptions, server).listen(8899,()=>{
//     console.log('HTTPS server is run in 8899');
//   });
//   http.createServer(server).listen(PORT,()=> console.log(`HTTP server is run in ${PORT}`));
// }
// bootstrap();
