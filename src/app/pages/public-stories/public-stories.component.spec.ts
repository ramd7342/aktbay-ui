import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStoriesComponent } from './public-stories.component';

describe('PublicStoriesComponent', () => {
  let component: PublicStoriesComponent;
  let fixture: ComponentFixture<PublicStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
