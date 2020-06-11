import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-full-program-view',
  templateUrl: './full-program-view.component.html',
  styleUrls: ['./full-program-view.component.css']
})
export class FullProgramViewComponent implements OnInit {

  windowScrolled: boolean;

  constructor() { window.scrollTo(500, 0); }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
        this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
        this.windowScrolled = false;
    }
}

  ngOnInit() {
  }

  scroll1() {
    document.querySelector('.full_Program_View_1').scrollIntoView({ behavior: 'smooth', });

  }


  scroll2() {
    document.querySelector('.full_Program_View_2').scrollIntoView({ behavior: 'smooth', });

  }

  scroll3() {
    document.querySelector('.full_Program_View_3').scrollIntoView({ behavior: 'smooth', });

  }
  scroll4() {
    document.querySelector('.full_Program_View_4').scrollIntoView({ behavior: 'smooth', });

  }
  scroll5() {
    document.querySelector('.full_Program_View_5').scrollIntoView({ behavior: 'smooth', });

  }
  scroll6() {
    document.querySelector('.full_Program_View_6').scrollIntoView({ behavior: 'smooth', });

  }
  scroll7() {
    document.querySelector('.full_Program_View_7').scrollIntoView({ behavior: 'smooth', });

  }
  scroll8() {
    document.querySelector('.full_Program_View_8').scrollIntoView({ behavior: 'smooth', });

  }
  scroll9() {
    document.querySelector('.full_Program_View_9').scrollIntoView({ behavior: 'smooth', });

  }
  scroll10() {
    document.querySelector('.full_Program_View_10').scrollIntoView({ behavior: 'smooth', });

  }
  scroll11() {
    document.querySelector('.full_Program_View_11').scrollIntoView({ behavior: 'smooth', });

  }
  scroll12() {
    document.querySelector('.full_Program_View_12').scrollIntoView({ behavior: 'smooth', });

  }
  scroll13() {
    document.querySelector('.full_Program_View_13').scrollIntoView({ behavior: 'smooth', });

  }
  scroll14() {
    document.querySelector('.full_Program_View_14').scrollIntoView({ behavior: 'smooth', });

  }


  scrollToTop() {
    (function smoothscroll() {

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }

    })();
}






}
