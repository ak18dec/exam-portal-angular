import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  users: User[];

  columns: string[] = ['firstName', 'lastName', 'email', 'phone','action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.users = [
      {
        username: 'ankii123',
        firstName: 'Ankit',
        lastName: 'Kumar',
        email: 'ankit@demo.com',
        password: '12345678',
        phone:'9876543210'
      },
      {
        username: 'ankit345',
        firstName: 'Rajat',
        lastName: 'Sharma',
        email: 'rajat@demo.com',
        password: 'password',
        phone:'1234567890'
      },
      {
        username: 'moh123',
        firstName: 'Mohit',
        lastName: 'Pawar',
        email: 'mohit@demo.com',
        password: '134pasdwd',
        phone:'4567891230'
      }
    ]
    this.dataSource = new MatTableDataSource(this.users);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddUserForm() {
    
  }

}
