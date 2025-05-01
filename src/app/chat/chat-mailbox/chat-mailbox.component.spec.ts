import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMailboxComponent } from './chat-mailbox.component';

describe('ChatMailboxComponent', () => {
  let component: ChatMailboxComponent;
  let fixture: ComponentFixture<ChatMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatMailboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
