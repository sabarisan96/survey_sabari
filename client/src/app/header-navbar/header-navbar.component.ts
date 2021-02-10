import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {
  menuData = [];
  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit() {
    // console.log(window.localStorage.getItem('user_typeid'))
    if (window.localStorage.getItem('user_typeid') === '1') {
      this.menuData = [{
        "menu_id": 1,
        "menu_name": "Create form",
        "menu_link": '',
      }, {
        "menu_id": 2,
        "menu_name": "List forms",
        "menu_link": 'listForms',
      },
      {
        "menu_id": 3,
        "menu_name": "Users",
        "menu_link": 'listForms',
        "submenu": [{
          "menu_id": 4,
          "menu_name": "Add/Delete Users",
          "menu_link": 'manageUsers'
        }, {
          "menu_id": 5,
          "menu_name": "User Access Rights",
          "menu_link": 'userAccessRights'
        }]
      }
      ];
    } else {
      this.menuData = [{
        "menu_id": 2,
        "menu_name": "List forms",
        "menu_link": 'listForms',
      }];
    }
  }




  logoutUser() {

    this.jwtService.destroyToken();
    this.router.navigate(['login']);

  }
}
