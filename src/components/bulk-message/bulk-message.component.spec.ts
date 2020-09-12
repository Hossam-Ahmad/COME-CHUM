import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMessageComponent } from './bulk-message.component';

describe('DasboardFooterComponent', () => {
  let component: BulkMessageComponent;
  let fixture: ComponentFixture<BulkMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
