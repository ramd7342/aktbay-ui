import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHighlightComponent } from './text-highlight.component';

describe('TextHighlightComponent', () => {
  let component: TextHighlightComponent;
  let fixture: ComponentFixture<TextHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextHighlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
