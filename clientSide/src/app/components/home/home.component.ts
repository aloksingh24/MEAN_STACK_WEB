import { Component, OnInit ,ElementRef} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  slideIndex = 1;
  constructor() { }
  
  ngOnInit() {
    
    this.showSlides(this.slideIndex);
  }
  showSlides = function(n) {
    var i;
    let slides = <HTMLElement[]><any> document.getElementsByClassName("mySlides");
    let dots = <HTMLElement[]><any> document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}    
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";  
    //slides[this.slideIndex-1].className += "fade";
    dots[this.slideIndex-1].className += " active";
    //setTimeout(this.showSlides,2000);
  }
  plusSlides = function(n) {
    this.showSlides(this.slideIndex += n);
  }
  
  currentSlide = function(n) {
    this.showSlides(this.slideIndex = n);
  }

}
