import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): any {
    return {
      name: 'swgu-nest',
      description:
        'The main server powering the Star Wars Galaxy Ultimate game.',
      entities: ['Players', 'Toons'],
    };
  }
}
