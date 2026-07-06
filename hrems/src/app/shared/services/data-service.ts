import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private sideBarHidden = new BehaviorSubject<boolean>(false);

  currentSideBarStatus = this.sideBarHidden.asObservable();

  updateSidebar(changeStatus: boolean) {
    this.sideBarHidden.next(changeStatus);
  }


}
