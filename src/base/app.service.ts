import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): any {
    return {
      name: 'swgu-nest',
      description: 'rest-api for Star Wars Galaxy Ultimate',
      entities: ['Players', 'Toons'],
    };
  }
}
