import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService)
  movieService = inject(MovieService)
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  popularMovies: IVideoContent [] = []

  ngOnInit(): void {
    this.movieService.getMovies()
    .subscribe(res => {
      console.log(res);
      this.popularMovies = res.results
    })
  }

  signOut(){
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }
}
