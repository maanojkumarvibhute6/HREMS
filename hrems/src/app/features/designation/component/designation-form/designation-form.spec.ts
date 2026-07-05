import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationFormComponent } from './designation-form';

describe('DesignationFormComponent', () => {
  let component: DesignationFormComponent;
  let fixture: ComponentFixture<DesignationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
