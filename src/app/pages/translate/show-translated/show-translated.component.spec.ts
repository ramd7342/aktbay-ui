import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTranslatedComponent } from './show-translated.component';

describe('ShowTranslatedComponent', () => {
  let component: ShowTranslatedComponent;
  let fixture: ComponentFixture<ShowTranslatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTranslatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTranslatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
