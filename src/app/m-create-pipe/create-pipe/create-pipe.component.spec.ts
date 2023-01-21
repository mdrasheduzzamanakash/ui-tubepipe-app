import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePipeComponent } from './create-pipe.component';

describe('CreatePipeComponent', () => {
  let component: CreatePipeComponent;
  let fixture: ComponentFixture<CreatePipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
