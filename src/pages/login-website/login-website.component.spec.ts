import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWebsiteComponent } from './login-website.component';

describe('LoginWebsiteComponent', () => {
  let component: LoginWebsiteComponent;
  let fixture: ComponentFixture<LoginWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
