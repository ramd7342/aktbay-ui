import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements AfterViewInit, OnInit {

  @Input()
  public topic: any;

  @Output() newTag: EventEmitter<any> = new EventEmitter()

  @ViewChild('eRef') public eRef: any;
 
  public isDisplayContextMenu: boolean = false;
  public rightClickMenuItems: Array<any> = [];
  public rightClickMenuPositionX: number = 0;
  public rightClickMenuPositionY: number = 0;
  public selectedText: any = "";
  public parsedTopicDescription: any = null;
  public tags = [ 
    {tagRegex: /\#(.*?)\#/gm, category: "country"},
    {tagRegex: /\@(.*?)\@/gm, category: "food"},
    {tagRegex: /\$(.*?)\$/gm, category: "hotel"}
   ];
   contextMenuPosition = { x: '0px', y: '0px' };
  constructor(private cdr: ChangeDetectorRef, private sanitized: DomSanitizer) {
  
  }

  
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.selectedText = window?.getSelection()?.toString();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
  }

  public tagSelected(): void {
    this.eRef.nativeElement.innerHTML = this.eRef.nativeElement.innerHTML.replace(this.selectedText, `<span style='background-color:#00FF00'>${this.selectedText}</span>`);
    this.newTag.emit(this.selectedText);
    this.selectedText = "";
    //  this.parsedTopicDescription.replace(this.selectedText, `<span style="background:#FFFF00"> ${this.selectedText} </span>`)
  }

  public getTagIcon(category: string) : string{
    let iconClass = "";
    switch(category){
      case "country": 
        iconClass = "bi bi-globe-americas";
        break; 
      case "region":
        iconClass = "bi bi-geo-alt-fill";
        break;
      case "city":
        iconClass = "bi bi-pin-map-fill";
        break;
      case "food": 
        iconClass = "bi bi-egg-fried";
        break; 
      case "hotel": 
        iconClass = "bi bi-shop";
        break; 
      default: 
        iconClass = ""
        break
    }
    return iconClass;
  }

  private extractTags ( storyDescription: any, regex: any, category: any )
  {
    if ( storyDescription.match( regex ) )
    {
      storyDescription.match( regex ).map( ( match: string ) =>
      {
        var matchTag = match.substring( 1, match.length - 1 );
        var index = this.parsedTopicDescription.indexOf(match);
        this.parsedTopicDescription = this.parsedTopicDescription.replace(match, "");
        var tagElement = this.topic.storyTags.find((storyTag: any)=> storyTag.tagName === matchTag)
        var replacement = `<span style='background-color:#00FF00'> ${tagElement.tagName} </span>`;
         this.parsedTopicDescription = this.parsedTopicDescription.substring(0, index) + replacement + this.parsedTopicDescription.substring(index)
      } );
    }
  }

  ngOnInit (): void
  {
    
  }

  ngAfterViewInit (): void
  {
    this.parsedTopicDescription = this.topic?.storyDescription;
    if(this.topic?.storyDescription) {
      this.tags.forEach((tag:any)=>{
        this.extractTags( this.topic.storyDescription, tag.tagRegex, tag.category );
      })
    }
    this.parsedTopicDescription = this.sanitized.bypassSecurityTrustHtml(this.parsedTopicDescription);
    this.cdr.detectChanges();
  }
}
