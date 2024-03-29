import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XcimageviewerComponent } from './xcimageviewer.component';

describe('XcimageviewerComponent', () => {
  let component: XcimageviewerComponent;
  let fixture: ComponentFixture<XcimageviewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XcimageviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcimageviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
