import { Component } from '@angular/core';
import { CommonFunctionService } from './services/common-function/common-function.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading = false;
  constructor(private commonService:CommonFunctionService){
  }
  ngOnInit(): void {
    this.commonService.loaderSubscriber.subscribe(res=>{
      this.isLoading = res;
      // console.log(this.isLoading);

    })
  }



  //Get the button
  // var mybutton = document.getElementById("myBtn");

  // // When the user scrolls down 20px from the top of the document, show the button
  // window.onscroll = function() {scrollFunction()};

  // function scrollFunction() {
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     mybutton.style.display = "block";
  //   } else {
  //     mybutton.style.display = "none";
  //   }
  // }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
