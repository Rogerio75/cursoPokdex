import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemon: any;
  public apiErro: boolean = false;
  constructor (
   private pokeApiService : PokeApiService

  ){}

ngOnInit(): void {
   this.pokeApiService.apiListAllPokemons.subscribe(
    res => {
            this.setAllPokemons = res.results;
            this.getAllPokemon= this.setAllPokemons;
           
    },
    error=>{
      this.apiErro= true;
    }

   );
}
 public getSearch(value:string){
 const filter = this.setAllPokemons.filter(
  (res: any) => {
  return  !res.name.indexOf(value.toLowerCase ());
  });

this.getAllPokemon =filter;
 }

}
