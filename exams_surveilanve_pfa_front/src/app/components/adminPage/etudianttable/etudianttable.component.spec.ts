import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudianttableComponent } from './etudianttable.component';

describe('EtudianttableComponent', () => {
  let component: EtudianttableComponent;
  let fixture: ComponentFixture<EtudianttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudianttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudianttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
