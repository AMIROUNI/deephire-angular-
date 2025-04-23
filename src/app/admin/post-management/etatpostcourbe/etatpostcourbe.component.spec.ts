import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatpostcourbeComponent } from './etatpostcourbe.component';

describe('EtatpostcourbeComponent', () => {
  let component: EtatpostcourbeComponent;
  let fixture: ComponentFixture<EtatpostcourbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatpostcourbeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatpostcourbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
