import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourbeutilisateursconnecteComponent } from './courbeutilisateursconnecte.component';

describe('CourbeutilisateursconnecteComponent', () => {
  let component: CourbeutilisateursconnecteComponent;
  let fixture: ComponentFixture<CourbeutilisateursconnecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourbeutilisateursconnecteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourbeutilisateursconnecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
