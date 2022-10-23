import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  addTag(){
    this.title.setTitle('Niilano | Car rentals in Ghana')

    this.meta.addTags([
      {name: 'Keywords', content : 'Niilano car rentals, Car rentals based in Ghana, Car rentals based in Gh, Ghana car rentals, Rent a car in Ghana, Rent a car, Rent a vehicle, book cars in Ghana, Book a car in Ghana'},
      { name: 'robots', content: 'index,follow'},
      {name:'author', content: 'Abdul-Latif Mohammed'}
    ])
  }

  constructor(private title : Title, private meta : Meta) { }
}
