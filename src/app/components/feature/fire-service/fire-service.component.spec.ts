import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireServiceComponent } from './fire-service.component';

describe('FireServiceComponent', () => {
  let component: FireServiceComponent;
  let fixture: ComponentFixture<FireServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
