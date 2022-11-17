import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  title = "Admin | Listings"

  listing:any

  constructor( private listings : AdminService ) { }

  ngOnInit(): void {

    this.listings.getListings().subscribe(
      res=>{
        console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        this.listing = result
      }
    )

  }

}
