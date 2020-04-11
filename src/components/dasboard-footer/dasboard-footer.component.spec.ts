import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardFooterComponent } from './dasboard-footer.component';

describe('DasboardFooterComponent', () => {
  let component: DasboardFooterComponent;
  let fixture: ComponentFixture<DasboardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
