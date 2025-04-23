import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StattotalpostComponent } from './stattotalpost.component';

describe('StattotalpostComponent', () => {
  let component: StattotalpostComponent;
  let fixture: ComponentFixture<StattotalpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StattotalpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StattotalpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
