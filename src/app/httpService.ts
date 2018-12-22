import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Color} from './color';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getColors(): Observable<Color[]> {
    return this.http.get('assets/data.json').pipe(map(data => {
      const colorsArray = data['colorsArray'];
      return colorsArray.map(function(color: any) {
        return {colorName: color.colorName, hexValue: color.hexValue};
      });

    }));
  }
}
