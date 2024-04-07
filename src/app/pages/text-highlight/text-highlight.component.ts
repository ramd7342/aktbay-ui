import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-highlight',
  templateUrl: './text-highlight.component.html',
  styleUrls: ['./text-highlight.component.scss']
})
export class TextHighlightComponent implements OnInit, AfterViewInit{
  @ViewChild('rRef') public rRef: any;
  public selectedText: any = "";
  public contextMenuPosition = { x: '0px', y: '0px' };
  public tagText = "";
  public parentId = "";
  ngOnInit(): void {
    console.log("1 TextHighlightComponent", this.rRef?.nativeElement?.innerHTML);
  }

  ngAfterViewInit(): void {
    console.log("2 TextHighlightComponent", this.rRef?.nativeElement?.innerHTML);
   /* document.getElementById("hoonReplace")?.style.setProperty("color", "red");
    document.getElementById("hoonReplace")?.style.setProperty("width", document.getElementById("hoon")?.offsetWidth+"px");
    document.getElementById("hoonReplace")?.style.setProperty("display", "inline-block");

    document.getElementById("naReplace")?.style.setProperty("color", "blue");
    document.getElementById("naReplace")?.style.setProperty("width", document.getElementById("na")?.offsetWidth+"px");
    document.getElementById("naReplace")?.style.setProperty("display", "inline-block");*/
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    let parent = ( <HTMLElement>event.target ).parentElement;
    const s = window?.getSelection();
    const selectionRange = s && s.getRangeAt(0);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px'; 
    if (s && s.toString().length > 0) {
      this.selectedText = selectionRange?.toString();
      this.parentId = parent?.id || "";
    } 
  }
  tagSelectionWithText(): void {
    var prependDiv : any = document.createElement("p");
    var innerContentHTML = this.rRef.nativeElement?.innerHTML;
    if(!document.getElementById("newDiv")) {
      prependDiv = document.createElement("p");
    } else {
      prependDiv = document.getElementById("newDiv") || document.createElement("p");
      innerContentHTML = prependDiv.innerHTML;
    }
    var divName = this.selectedText.replace(/\s/g, "");
    var divNameReplace = divName+"Replace";
    prependDiv.id = "newDiv";
    

    prependDiv.innerHTML = `<span id="${divNameReplace}" style="color:red">${this.tagText}</span>`;
    this.rRef.nativeElement.innerHTML = this.rRef.nativeElement?.innerHTML?.replace(this.selectedText, `<mark id="${divName}">${this.selectedText}</mark>`) || "";
    document.getElementById(this.parentId)?.insertBefore(prependDiv, document.getElementById(this.parentId)?.firstChild || null);

    document.getElementById(divNameReplace)?.style.setProperty("width", document.getElementById(divName)?.offsetWidth+"px");
   // document.getElementById(divNameReplace)?.style.setProperty("display", "inline-block");
    prependDiv.style.visibility = "hidden";
    document.getElementById(divName)?.addEventListener('click', (event:any) => { 
      prependDiv.style.visibility = prependDiv.style.visibility === "visible" ? "hidden" : "visible";
    });
    this.selectedText = "";
  }
  /*tagSelectionWithText(): void {
    var prependDiv : any = document.createElement("p");
    if(!document.getElementById("newDiv")) {
      prependDiv = document.createElement("p");
    } else {
      prependDiv = document.getElementById("newDiv") || document.createElement("p");
    }
    var divName = this.selectedText.replace(/\s/g, "");
    var divNameReplace = divName+"Replace";
    prependDiv.id = "newDiv";
    
    prependDiv.innerHTML = this.rRef.nativeElement?.innerHTML?.replace(this.selectedText, `<span id="${divNameReplace}" style="color:red">${this.tagText}</span>`) || "";
    this.rRef.nativeElement.innerHTML = this.rRef.nativeElement?.innerHTML?.replace(this.selectedText, `<mark id="${divName}" style="color:red">${this.selectedText}</mark>`) || "";
    document.getElementById(this.parentId)?.insertBefore(prependDiv, document.getElementById(this.parentId)?.firstChild || null);

    document.getElementById(divNameReplace)?.style.setProperty("width", document.getElementById(divName)?.offsetWidth+"px");
    document.getElementById(divNameReplace)?.style.setProperty("display", "inline-block");
    this.selectedText = "";
  }*/
}
