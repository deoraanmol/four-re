import { Injectable } from '@angular/core';

@Injectable()
export class WindowServiceService {

  get windowRef() {
    return window
  }

}
