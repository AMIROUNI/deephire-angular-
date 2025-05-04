import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCardsAcComponent } from './kpi-cards-ac.component';

describe('KpiCardsAcComponent', () => {
  let component: KpiCardsAcComponent;
  let fixture: ComponentFixture<KpiCardsAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpiCardsAcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiCardsAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
