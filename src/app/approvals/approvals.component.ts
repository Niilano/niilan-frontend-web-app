import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { UsersInfoService } from '../users-info.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  isCollapsed = true
  isCollapsed1 = true

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  dataSource1 = [
    { vehicle : 'v12' , customerName : 'Abdul-Latif', status : 'Awaiting Approval' },
    { vehicle : 'v13' , customerName : 'Abdul-Latif', status : 'Awaiting Approval' },
    { vehicle : 'v14' , customerName : 'Abdul-Latif', status : 'Awaiting Approval' },
    { vehicle : 'v15' , customerName : 'Abdul-Latif', status : 'Awaiting Approval' },
    { vehicle : 'v16' , customerName : 'Abdul-Latif', status : 'Awaiting Approval' }
  ]

  requests : any

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor( private cars : CarsService ) { }

  ngOnInit(): void {
    this.cars.requests().subscribe(
      res=>{
        console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        console.log(result.r)
        this.requests = result.r
      }
    )
  }

}
