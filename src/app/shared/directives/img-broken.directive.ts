import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @HostListener('error') handLeError(): void {

    const elNative = this.elHost.nativeElement
    console.log('esta imagen revento' , this.elHost);
    elNative.src = '../../../assets/img/imgbroken.jpg'
  }

  constructor(private elHost: ElementRef) { 
         console.log( this.elHost) 
  }

}
