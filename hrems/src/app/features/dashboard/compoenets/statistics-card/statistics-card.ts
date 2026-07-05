import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonConstants } from '../../../../core/constants/common.constant';

@Component({
  selector: 'app-statistics-card',
  imports: [
    CommonModule,
    CardModule,
  ],
  templateUrl: './statistics-card.html',
  styles: ``,
})
export class StatisticsCardComponent {
  @Input() cardTitle: string = '';
  @Input() cardIcon: string = '';
  @Input() totalCount: number = 0;
  @Input() newDepartmentsAdded: number = 0;
  @Input() newDesignationsAdded: number = 0;
  @Input() totalEmployeesLeave: number = 0;
  @Input() totalEmployeesAttendences: number = 0;

  @Input() newEmployeesAdded: number = 0;
  @Input() newAdminEmployeesAdded: number = 0;
  @Input() newManagerEmployeesAdded: number = 0;
  @Input() newOtherEmployeesAdded: number = 0;

  commonConstants = CommonConstants;
}
