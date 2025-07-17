import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger 选项
  const config = new DocumentBuilder()
    .setTitle('会员 API')
    .setDescription('会员 API 文档')
    .setVersion('1.0')
    .addTag('merchants')
    .build();


  // 创建 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);
  // 设置 Swagger UI 路径
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
