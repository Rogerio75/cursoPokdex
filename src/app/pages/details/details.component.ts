import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
//services
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
private urlName: string ='https://pokeapi.co/api/v2/pokemon-species';

public pokemon: any;
public isLoading: boolean = false;
public apiErro: boolean = false;
constructor (
  private activatedRoute : ActivatedRoute,
  private  pokerApiService: PokeApiService
  ){}

ngOnInit(): void {
  this.getPokemon();
}

public getPokemon(){
 const id = this.activatedRoute.snapshot.params['id'];
 const pokemon = this.pokerApiService.apiGetPokemos(`${this.urlPokemon}/${id}`);
 const name = this.pokerApiService.apiGetPokemos(`${this.urlName}/${id}`);

  return forkJoin ([pokemon, name]).subscribe(
   res => {
     this.pokemon = res;
     this.isLoading = true;

    },
    error =>{
     this.apiErro = true;

    }
  );
}


}
