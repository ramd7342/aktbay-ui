import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktbaySearchComponent } from './aktbay-search.component';

describe('AktbaySearchComponent', () => {
  let component: AktbaySearchComponent;
  let fixture: ComponentFixture<AktbaySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktbaySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktbaySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
