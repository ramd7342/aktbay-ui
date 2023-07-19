import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktbayTopicsViewComponent } from './aktbay-topics-view.component';

describe('AktbayTopicsViewComponent', () => {
  let component: AktbayTopicsViewComponent;
  let fixture: ComponentFixture<AktbayTopicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktbayTopicsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktbayTopicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
