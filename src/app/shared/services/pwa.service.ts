import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';


@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: Event;

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
    console.log('SwUpdate enabled');
    this.swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });
   } else {
     console.log('swUpdate not enable');
   }
    window.addEventListener('befor installprompt', (event) => {
     this.promptEvent = event;
   });
  }
   private askUserToUpdate(): boolean {
     console.log('PwaService::Accept updates');
     return confirm('une nouvelle version est disponible. installer ?');
  }
}
