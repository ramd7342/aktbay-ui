import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnInit, QueryList, Renderer2, SecurityContext, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-show-translated',
  templateUrl: './show-translated.component.html',
  styleUrls: ['./show-translated.component.scss']
})
export class ShowTranslatedComponent implements OnInit, AfterViewInit {
  @Input() public selections: any;
  @Input() public idref: any;
  @Input() public content: any;
  @ViewChild('eRef') public eRef: any;
  public description = 'this is <mark id="12345" style="background-color: red">my marked</mark> text?';
  public descr: SafeHtml  | undefined;
  @ViewChild('myDiv', { static: true }) myDiv: ElementRef | undefined;
  constructor(private readonly domSanitizer: DomSanitizer) { 
   // this.eRef.nativeElement.innerHTML = this.selections[this.idref]?.text;
  }

  public sanitize(input: string): SafeHtml {
    return this.domSanitizer.sanitize(SecurityContext.HTML, input) || '';
  }

  sanitizedByAngular = this.sanitize("<a href=\"http://www.example.com\">Click Me!</a>");
  nonSanitized = "<a href=\"javascript:alert('owned')\">Click Me!</a>";
  innerSanitized = this.sanitize("<a href=\"javascript:alert('owned')\">Click Me!</a>");

  ngOnInit(): void {
   // console.log("selections :: ", this.content);
  // this.selections?.selections?.sort((a:any,b:any)=>b.startOffset-a.startOffset);
  this.descr = this.domSanitizer.bypassSecurityTrustHtml(this.description);
  }

  ngAfterViewInit(): void {
    //console.log("idref :: ", this.idref, "content", this.content);
   /* const span = this.renderer.createElement('mark');
    this.renderer.setAttribute(span, 'ng-reflect-ngb-tooltip', 'Some tooltip 1');
    const text = this.renderer.createText('Some text 1');
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.container.nativeElement, span);*/
    document.querySelectorAll("#container mark").forEach((tag: any) => {
      console.log("tag", tag);
      tag.addEventListener('click', (event:any) => {
        alert('mark clicked');
      });
    });
  }

  clickMe(): void {
    console.log("clickMe");
  }

  getTranslatedText(obj: any): string {
    let styledStr = obj?.text;
    obj?.selections.sort((a:any,b:any)=>b.startOffset-a.startOffset);
    obj?.selections.forEach((selection: any, i:any) => {
      const { startOffset, endOffset, tagtext, text, uploadedImage } = selection;
      var idx = obj?.selections.find((m:any)=>m.startOffset === startOffset && m.endOffset === endOffset && m.text === text);
      if(idx.length > 1) {
        return styledStr;
      }
      
      let replaceText = `<mark placement="top" ngbTooltip="${tagtext}">${text}</mark>`;
      styledStr = styledStr.substring(0,startOffset) +  replaceText + styledStr.substring(endOffset)
      styledStr.slice(startOffset,endOffset,replaceText);
    });
    return styledStr || "";
  }

  getContent(itemtext:string, selectionstext:string): string {
    return `${selectionstext.substring(0, selectionstext.indexOf(itemtext))} <mark [ngbTooltip]="tipContent">${itemtext}</mark> ${selectionstext.substring(selectionstext.indexOf(itemtext) + itemtext.length)}`;
  }

  getInnerHTML(obj: any): string {
    return `<ng-template #tipContent>
      ${obj.tagtext}
    </ng-template>
    <mark [ngbTooltip]="tipContent">${obj.text}</mark>`;
  }
}

