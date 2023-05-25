import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateetudiantComponent } from './updateetudiant.component';

describe('UpdateetudiantComponent', () => {
  let component: UpdateetudiantComponent;
  let fixture: ComponentFixture<UpdateetudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateetudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
