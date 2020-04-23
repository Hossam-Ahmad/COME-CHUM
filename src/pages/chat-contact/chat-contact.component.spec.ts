import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContactComponent } from './chat-contact.component';

describe('PortoflioComponent', () => {
  let component: ChatContactComponent;
  let fixture: ComponentFixture<ChatContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
