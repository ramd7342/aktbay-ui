import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktbayTopicsComponent } from './aktbay-topics.component';

describe('AktbayTopicsComponent', () => {
  let component: AktbayTopicsComponent;
  let fixture: ComponentFixture<AktbayTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktbayTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktbayTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
