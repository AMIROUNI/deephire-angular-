import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingAcComponent } from './job-posting-ac.component';

describe('JobPostingAcComponent', () => {
  let component: JobPostingAcComponent;
  let fixture: ComponentFixture<JobPostingAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostingAcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostingAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
