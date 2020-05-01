import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetWebsiteComponent } from './forget-website.component';

describe('ForgetWebsiteComponent', () => {
  let component: ForgetWebsiteComponent;
  let fixture: ComponentFixture<ForgetWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
