import { ChangeDetectionStrategy, ChangeDetectorRef, Component, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent {
  @ViewChild('eRef') public eRef: any;
  
  public selectedText: any = "";
  public contextMenuPosition = { x: '0px', y: '0px' };
  public selection : any = {};
  public selectionMap: any = {};
  public tagText = "";
  public showAll = false;
  public translatedText = "";
  public uploadedImage : any = {};
  constructor(private cdr: ChangeDetectorRef) {}

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    let parent = ( <HTMLElement>event.target ).parentElement;
    const s = window?.getSelection();
    const selectionRange = s && s.getRangeAt(0);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';

    if (s && s.toString().length > 0) {
      this.selectedText = selectionRange?.toString();
      let selectedObj = {
        startOffset: selectionRange?.startOffset && selectionRange?.startOffset - 1,
        endOffset: selectionRange?.endOffset && selectionRange?.endOffset - 1,
        text: selectionRange?.toString(),
        tagtext: "",
        uploadedImage: {}, 
        id: parent?.id
      };
      this.selection = selectedObj;
    }    
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

  tagSelectionWithText(): void {
   this.selection.tagtext = this.tagText;
   this.selectionMap[this.selection?.id] = this.selectionMap[this.selection?.id] ? this.selectionMap[this.selection?.id] : {text:"", selections: []};
   var ifExists = this.selectionMap[this.selection?.id]["selections"].find((m:any)=>m.startOffset === this.selection.startOffset && m.endOffset === this.selection.endOffset && m.text === this.selection.text);
   this.selectionMap[this.selection?.id]["text"] = this.eRef.nativeElement.querySelector("#"+this.selection.id).innerText;
   this.selectionMap[this.selection?.id]["selections"] = [...this.selectionMap[this.selection?.id]["selections"] || []];
   if(!ifExists) {
    this.selectionMap[this.selection?.id]["selections"].push(this.selection);
   } else {
    this.selectionMap[this.selection?.id]["selections"][this.selectionMap[this.selection?.id]["selections"].indexOf(ifExists)] = this.selection;
   }
   this.selectedText = "";
   this.tagText = "";
   this.showAll = false;
  }
  
  show() : void {
   this.showAll = !this.showAll;
  }

  handleFileInput(event: any) {
   
  }
}
