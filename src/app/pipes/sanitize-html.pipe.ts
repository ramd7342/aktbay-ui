import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'sanitizedHtml',
})
/*
  Custom Pipe that recognizes html content in the text and renders as a html element
  usage : <div [innerHTML]="text | sanitizedHtml"></div>
*/
export class SanitizedHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any): any {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
