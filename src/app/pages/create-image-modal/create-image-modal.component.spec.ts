import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImageModalComponent } from './create-image-modal.component';

describe('CreateImageModalComponent', () => {
  let component: CreateImageModalComponent;
  let fixture: ComponentFixture<CreateImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateImageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
