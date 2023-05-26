import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaffecComponent } from './addaffec.component';

describe('AddaffecComponent', () => {
  let component: AddaffecComponent;
  let fixture: ComponentFixture<AddaffecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddaffecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddaffecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
