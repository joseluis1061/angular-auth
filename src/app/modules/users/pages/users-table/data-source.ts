import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '@models/users.model';

export class DataSourceUser extends DataSource<any[]> {

  data = new BehaviorSubject<Users[]>([]);
  originalData: Users[]= [];

  connect(): Observable<any[]> {
    return this.data;
  }

  init(data: Users[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
