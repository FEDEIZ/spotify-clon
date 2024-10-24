import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg:string = ''
  @HostListener('error') handleError(): void{
    const elNative = this.host.nativeElement;
    elNative.src = this.customImg
  }

  constructor(private host: ElementRef) { }

}
