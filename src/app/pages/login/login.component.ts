declare var google: any;

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private router = inject(Router)
  
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '792525425371-b9osa7m1kvmvp4qbrjjaq2vklhmlcds8.apps.googleusercontent.com',
      callback: (res: any)=> this.handleLogin(res)
    })
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(res: any){
    if(res){
      console.log(res);
      
      const payLoad = this.decodeToken(res.credential);

      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad))

      this.router.navigate(['browse'])
    }
  }
}
