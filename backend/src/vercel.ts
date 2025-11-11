import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    const config = new DocumentBuilder()
      .setTitle('Plenna API')
      .setDescription('Sistema de Pagamentos')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.init();
    cachedServer = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
  }

  return cachedServer;
}

export const handler = async (event: any, context: any) => {
  const server = await bootstrapServer();
  return server(event, context);
};
