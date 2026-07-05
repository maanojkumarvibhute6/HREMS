import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentComponent } from './edit-department';

describe('EditDepartmentComponent', () => {
  let component: EditDepartmentComponent;
  let fixture: ComponentFixture<EditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDepartmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDepartmentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
