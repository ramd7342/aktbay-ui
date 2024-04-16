import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotateContentComponent } from './annotate-content.component';

describe('AnnotateContentComponent', () => {
  let component: AnnotateContentComponent;
  let fixture: ComponentFixture<AnnotateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnotateContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
