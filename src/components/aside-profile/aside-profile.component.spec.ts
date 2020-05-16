import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { asideProfileComponent } from './aside-profile.component';

describe('asideProfileComponent', () => {
  let component: asideProfileComponent;
  let fixture: ComponentFixture<asideProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ asideProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(asideProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
