import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCComponent } from './report-c.component';

describe('ReportCComponent', () => {
  let component: ReportCComponent;
  let fixture: ComponentFixture<ReportCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
