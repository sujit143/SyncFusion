import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';

import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule, MatCheckboxModule} from '@angular/material';
import {MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import {MatExpansionModule} from '@angular/material/expansion';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleAllModule,  } from '@syncfusion/ej2-angular-schedule';
import { PhoneMaskDirective } from './menu-nav/phone-mask.directive';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,

        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        MatCheckboxModule,
        MultiSelectAllModule,
        AutoCompleteModule,
        MatExpansionModule,
        ScheduleAllModule,
        DatePickerModule,
        DatePickerAllModule,
        DateTimePickerAllModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,NgbModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, MenuNavComponent,PhoneMaskDirective]
})
export class LayoutModule {}
