import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateWebsiteComponent } from './activate-website.component';

describe('ForgetWebsiteComponent', () => {
  let component: ActivateWebsiteComponent;
  let fixture: ComponentFixture<ActivateWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
