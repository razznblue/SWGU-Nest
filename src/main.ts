import { NestFactory } from '@nestjs/core';
import { AppModule } from './base/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3005);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

// import * as fs from 'fs';
// import * as path from 'path';
// import { Toon } from './entities/models/Toon';

// console.log(__dirname);
// const toonsPath = path.resolve(__dirname, "collection_base", "toons", "toons.json");
// const jsonData = JSON.parse(fs.readFileSync(toonsPath, {encoding: 'utf8'}));
// const toons = [];

// for (const json of jsonData) {
//     toons.push(new Toon(json));
// }

// console.log(toons);