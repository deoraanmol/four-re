import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {UserHttpService} from '../services/user-http.service';
import {DatePipe} from '@angular/common';

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

  constructor(private userHttpService: UserHttpService,
              private datePipe: DatePipe) { }
  options: string[] = ['ALL', 'PENDING', 'COMPLETED'];
  dataSource = new MatTableDataSource(null);
  selection:object = {};
  selectedStatus: string = "ALL";
  selectedDate: string = null;
  selectedRequests = [];
  ELEMENT_DATA: PeriodicElement[] = [
    {
      "requestId": 123,
      "noOfBags": 1,
      "startDate": "2019-11-04T02:30:00.181Z",
      "endDate": "2019-11-05T05:30:00.181Z",
      "pinCode": 1983,
      "status": "PENDING",
      "totalValue": "10",
      "accountId": "+919811882111",
      "mobileNumber": "+919811882111",
      "name": "PANKAJ GARG",
      "society": "Ireo Grand Arch",
      "flatNo": "16",
      "email": "PANKAJGARG@GMAIL.COM"
    },
    {
      "requestId": 124,
      "noOfBags": 1,
      "startDate": "2019-11-04T02:30:00.181Z",
      "endDate": "2019-11-05T05:30:00.181Z",
      "pinCode": 1983,
      "status": "PENDING",
      "totalValue": "10",
      "accountId": "+919811882111",
      "mobileNumber": "+919811882111",
      "name": "PANKAJ GARG",
      "society": "Ireo Grand Arch",
      "flatNo": "16",
      "email": "PANKAJGARG@GMAIL.COM"
    }
  ];
  displayedColumns: string[] = ['select',
    'requestId',
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
    // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.userHttpService.getRequestPins(this.selectedStatus, {})
      .subscribe(res => {
        var self = this;
        res.forEach(function(eachReq){
          self.selection[eachReq.requestId] = false;
        })
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(filterValue: string, source) {
    this.resetSelection();
    if(source === 'date') {
      this.selectedDate = this.datePipe.transform(filterValue, "yyyy-MM-dd");
    } else if (source === 'status') {
      this.selectedStatus = filterValue;
    }
    this.userHttpService.getRequestPins(this.selectedStatus, {startTime: this.selectedDate})
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      });
  }

  cancelRequests() {
    var reqIds = [];
    this.selectedRequests.forEach(function(eachReq) {
      reqIds.push(eachReq['requestId']);
    })
    if(this.selectedRequests.length > 0) {
      this.userHttpService.updateRequests(reqIds, {status: 'SERVER_CANCELLED'})
        .subscribe(res => {
          this.selectedDate = null;
          this.applyFilter("ALL", 'status');
        })
    } else {
      alert("Please select a request");
    }
  }

  resetSelection() {
    this.selectedRequests = [];
    this.selection = {};
  }

  toggleRow(row) {
    if(this.selection[row.requestId]) {
      this.selectedRequests.push(row);
    } else {
      this.selectedRequests.splice(row, 1);
    }
  }
}
