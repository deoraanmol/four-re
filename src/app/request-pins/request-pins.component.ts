import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {UserHttpService} from '../services/user-http.service';

export interface PeriodicElement {
  requestId: number;
  mobileNumber: string; //join
  name: string; //join
  society: string; //join
  flatNo: string; //join
  noOfBags: number;
  startDate: string;
  endDate: string;
  pinCode: number;
  status: string;
  totalValue: string;
  accountId: string;
  email: string; //join
}

@Component({
  selector: 'app-request-pins',
  templateUrl: './request-pins.component.html',
  styleUrls: ['./request-pins.component.css']
})
export class RequestPinsComponent implements OnInit {

  constructor(private userHttpService: UserHttpService) { }
  options: string[] = ['ALL', 'PENDING', 'COMPLETED'];
  dataSource = new MatTableDataSource(null);
  displayedColumns: string[] = ['requestId',
    'mobileNumber',
    'name',
    'society',
    'flatNo',
    'noOfBags',
    'startDate',
    'endDate',
    'pickupCode',
    'status',
    'requestValue',
    'accountId',
    'email'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.userHttpService.getRequestPins("ALL")
      .subscribe(res => {
        debugger;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(filterValue: string) {
    this.userHttpService.getRequestPins(filterValue)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      });
  }
}
