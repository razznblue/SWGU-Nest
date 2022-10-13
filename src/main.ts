import axios from 'axios';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './base/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
  app.enableCors({
    origin: function (origin, callback) {
      console.log('origin: ', origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: 'Content-Type, Accept, Authorization, Origin',
    preflightContinue: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
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
