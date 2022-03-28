import { Component, OnInit } from '@angular/core';
import { Socio } from '../ISocio'; // Interfaz
import { SOCIOS } from '../mock-socios'; // BD
import { SociosService  } from '../socios.service'; //Servicio

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {

  // socios = SOCIOS;
  socios: Socio[] = [];

  socioSeleccionado?: Socio;

  constructor(private sociosService: SociosService) { }

  ngOnInit(): void {
    this.obtenerSocios();
  }

  onSelect(socio: Socio): void {
    this.socioSeleccionado = socio;
  }

  obtenerSocios(): void {
    // this.socios = this.sociosService.obtenerSocios(); // Metodo sincrono
    this.sociosService.obtenerSocios().subscribe(socios => this.socios = socios); // Esperamos que el server nos mande los datos - Metodo asincrono
  }

  title = 'angular-datatables-example';

  jsonData : any = [{
    playerName: 'Cristiano Ronaldo',
    playerCountry: 'Pourtgal',
    playerClub: 'Juventus'
  },
  {
    playerName: 'Lionel Messi',
    playerCountry: 'Argentina',
    playerClub: 'Barcelona'
  },
  {
    playerName: 'Neymar Junior',
    playerCountry: 'Brazil',
    playerClub: 'PSG'
  },
  {
  playerName: 'Tonni Kroos',
  playerCountry: 'Germany',
  playerClub: 'Real Madrid'
  },
  {
    playerName: 'Paul Pogba',
    playerCountry: 'France',
    playerClub: 'Manchester United'
  },
  {
    playerName: 'Sergio Ramos',
    playerCountry: 'Espain',
    playerClub: 'Real Madrid'
  },
  {
    playerName: 'H. Kane',
    playerCountry: 'England',
    playerClub: 'Tottanhum'
  },
  {
    playerName: 'Luiz Suarez',
    playerCountry: 'Urgway',
    playerClub: 'Atletico Madrid'
  },
  {
    playerName: 'Eden Hazard',
    playerCountry: 'Belgium',
    playerClub: 'Real Madrid'
  },
  {
    playerName: 'Vinicious Junior',
    playerCountry: 'Brazil',
    playerClub: 'Real Madrid'
  },
  {
    playerName: 'Karim Benzema',
    playerCountry: 'France',
    playerClub: 'Real Madrid'
  },
  {
    playerName: 'Ant. Grizzeman',
    playerCountry: 'France',
    playerClub: 'Barcelona'
  },
  {
    playerName: 'Sadio Mane',
    playerCountry: 'NA',
    playerClub: 'Liverpool'
  }];

}
