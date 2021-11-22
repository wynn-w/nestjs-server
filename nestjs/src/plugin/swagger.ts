/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
class MSwagger {
  constructor(app: INestApplication) {
    this.init(app);
  }
  init(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Swagger document test')
      .setDescription('Nestjs server api description')
      .setVersion('0.0.1')
      // .addTag('cats') // 添加的分类
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}
export { MSwagger };
