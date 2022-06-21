import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { environment } from 'src/environments/environment';


// export interface Food {
//   fdc_id: number;
//   description: string;
//   search_frequency: number;

// }

@Injectable({
  providedIn: 'root'
})

export class FoodService {


  constructor(private httpClient: HttpClient) { }

  public getFood(description: string) {
    return this.httpClient.get(environment.apiBaseUrl + "/food/" + description).pipe(delay(500));;
  }
}
