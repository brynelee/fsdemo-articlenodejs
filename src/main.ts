import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import agent from 'skywalking-backend-js';

async function bootstrap() {

/*  agent.start({
    serviceName: 'fsdemo-articlenodejs',
    serviceInstance: 'fsdemo-articlenodejs-instance',
    collectorAddress: 'skywalking-skywalking-helm-oap:11800'
  });*/

  //skywalking agent starting using ENV variables for configuration
  //using ENV instead of coding to suit for k8s deployment
  agent.start();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8087);
}
bootstrap();
