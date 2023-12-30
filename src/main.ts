import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {handleDownloadDBFromFirebase} from "./config/firebase.config";


async function bootstrap() {
  await handleDownloadDBFromFirebase()
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(process.env.PORT || 3007);
}

bootstrap();
