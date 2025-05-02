import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayJobPostingsComponent } from './display-job-postings.component';

describe('DisplayJobPostingsComponent', () => {
  let component: DisplayJobPostingsComponent;
  let fixture: ComponentFixture<DisplayJobPostingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayJobPostingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayJobPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
