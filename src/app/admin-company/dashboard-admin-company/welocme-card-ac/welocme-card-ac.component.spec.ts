import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelocmeCardAcComponent } from './welocme-card-ac.component';

describe('WelocmeCardAcComponent', () => {
  let component: WelocmeCardAcComponent;
  let fixture: ComponentFixture<WelocmeCardAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelocmeCardAcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelocmeCardAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
