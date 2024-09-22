import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  constructor(private router: Router) { }

  recuperar(){
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

}
