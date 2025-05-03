import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminCompanyComponent } from './dashboard-admin-company.component';

describe('DashboardAdminCompanyComponent', () => {
  let component: DashboardAdminCompanyComponent;
  let fixture: ComponentFixture<DashboardAdminCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAdminCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdminCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
