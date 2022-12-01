import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeCartComponent } from './pipe-cart.component';

describe('PipeCartComponent', () => {
  let component: PipeCartComponent;
  let fixture: ComponentFixture<PipeCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
