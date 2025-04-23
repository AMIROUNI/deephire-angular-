import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedpostcourbeComponent } from './createdpostcourbe.component';

describe('CreatedpostcourbeComponent', () => {
  let component: CreatedpostcourbeComponent;
  let fixture: ComponentFixture<CreatedpostcourbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatedpostcourbeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedpostcourbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
