import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

//Observable
@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url : string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  constructor(
   private http: HttpClient
  ) { }
  
 get apiListAllPokemons ():Observable<any> {
  return this.http.get<any>(this.url).pipe(
   tap ( res => res),
   tap ( res => {
   res.results.map((resPokemons: any ) =>{
     this.apiGetPokemos(resPokemons.url).subscribe(
      res =>  resPokemons.status = res
    )
   })
  })
  )
 }
  public apiGetPokemos( url: string):Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
      )
  }
}
