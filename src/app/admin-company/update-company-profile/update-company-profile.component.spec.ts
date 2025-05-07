import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyProfileComponent } from './update-company-profile.component';

describe('UpdateCompanyProfileComponent', () => {
  let component: UpdateCompanyProfileComponent;
  let fixture: ComponentFixture<UpdateCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCompanyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
