import axios from 'axios';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './base/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080);

  setInterval(async () => {
    await axios.get('https://swgu-nest.herokuapp.com/');
    console.log('App Pinged');
  }, 300000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
