import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationListComponent } from './designation-list';

describe('DesignationListComponent', () => {
  let component: DesignationListComponent;
  let fixture: ComponentFixture<DesignationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignationListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
