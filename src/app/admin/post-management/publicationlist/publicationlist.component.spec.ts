import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationlistComponent } from './publicationlist.component';

describe('PublicationlistComponent', () => {
  let component: PublicationlistComponent;
  let fixture: ComponentFixture<PublicationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicationlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
