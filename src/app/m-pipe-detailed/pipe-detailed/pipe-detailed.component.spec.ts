import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeDetailedComponent } from './pipe-detailed.component';

describe('PipeDetailedComponent', () => {
  let component: PipeDetailedComponent;
  let fixture: ComponentFixture<PipeDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
