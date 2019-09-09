import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Specaility } from './speciality';
import { doctorData } from './data';
import { startWith, map } from 'rxjs/operators';
import { View, GroupModel, EventSettingsModel, ResourceDetails, TreeViewArgs, ActionEventArgs, EventFieldsMapping, PopupOpenEventArgs, RenderCellEventArgs } from '@syncfusion/ej2-schedule';
import {  addClass, extend } from '@syncfusion/ej2-base';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { Patdetails } from './patdetails';




@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

//----------------FORM-----------
details: FormGroup;
callerdetails: FormGroup;
general: FormGroup;
address: FormGroup;
contact: FormGroup;
other: FormGroup;
isActive: Boolean = false;
closeResult: string;
control = new FormControl();
relations: string[] = ['Child', 'Parent', 'Self', 'Spouse','Aunt','Cousin','Former Spouse','Grandchild','Inlaw','Niece/Nephew'];
filteredRelation: Observable<string[]>;
//---------------FORM---------------

    constructor(private modalService: NgbModal,private _data:DataService,private fb: FormBuilder) { }

//---------------FORM--------------------
    patname: string = '';
    fisrtname: string = '';
    lastname: string = '';
    phone: string = '';
    email: string = '';
    arr: Patdetails[] = [
      new Patdetails('bs', 'zz', '12365', 'sdgvdv'),
      new Patdetails('ak', 'zz', '12365', 'sdgvdv'),
      new Patdetails('ak', 'zz', '12365', 'sdgvdv'),
      new Patdetails('ak', 'zz', '12365', 'sdgvdv'),
      new Patdetails('bs', 'zz', '12365', 'sdgvdv'),
      new Patdetails('nm', 'zz', '12365', 'sdgvdv'),
      new Patdetails('re', 'zz', '12365', 'sdgvdv'),
      new Patdetails('yt', 'zz', '12365', 'sdgvdv'),
      new Patdetails('jh', 'zz', '12365', 'sdgvdv')
    ];
//-------------FORM END------------------------------

  myCases=false;
  officeDashboard = false;
  adjusterDashboard = false;

 arrspe:Specaility[]=[];

    // // maps the appropriate column to fields property
    // public fields: Object = { value: "Name" };
    // // set the placeholder to the AutoComplete input
    // public text: string = "Find Practice";
    // //enable the highlight property to highlight the matched character in suggestion list
    // public autofill: Boolean = true;
    // maps the local data column to fields property
    public localFields: Object = { text: 'Name' };
    // set the placeholder to MultiSelect input element
    public localWaterMark: string = 'Select practice';

    public searchData1: { [key: string]: Object }[] = [
      {  Code: 'AU' },
      {  Code: 'BM' },
      {  Code: 'CA'},
      {  Code: 'CM' },
      {  Code: 'DK'},
      {  Code: 'FR'},
      {  Code: 'FI' },
      { Code: 'DE' },
      {  Code: 'GL'},
      { Code: 'HK'},
      { Code: 'IN'},
      {  Code: 'IT' },
      { Code: 'JP'},
      {  Code: 'MX' },
      {  Code: 'NO' },
      {  Code: 'PL'},
      { Code: 'CH' },
      {  Code: 'GB' },
      { Code: 'US'}];
      // maps the appropriate column to fields property
      public fields1: Object = { value: "Code" };
      // set the placeholder to the AutoComplete input
      public text1: string = "Find a code";
      //enable the highlight property to highlight the matched character in suggestion list
      public autofill1: Boolean = true;

      public searchData2: { [key: string]: Object }[] = [
        {Provider:'ABC' },
        {Provider:'DEF' },
        { Provider:'GHI'},
        {Provider:'GHI' },
        {Provider:'GHI' },
        { Provider:'GHI'},
        {Provider:'GHI' },
        {Provider:'ABC'},
        {Provider:'ABC' },
        { Provider:'ABC'},
        { Provider:'ABC'},
        { Provider:'ABC'},
        { Provider:'ABC'},
        { Provider:'ABC'},
        { Provider:'ABC'},
        {Provider:'ABC'},
        {Provider:'ABC' },
        { Provider:'ABC' },
        { Provider:'ABC'}];
        // maps the appropriate column to fields property
        public fields2: Object = { value: "Provider" };
        // set the placeholder to the AutoComplete input
        public text2: string = "Find a Provider";
        //enable the highlight property to highlight the matched character in suggestion list
        public autofill2: Boolean = true;

         arr1:Specaility[]=[];
        //   // maps the appropriate column to fields property
          public fields3: Object = { value: "Name" };
        //   // set the placeholder to the AutoComplete input
          public text3: string = "Find a Provider";
        //   //enable the highlight property to highlight the matched character in suggestion list
          public autofill3: Boolean = true;






    public data: Object[] = <Object[]>extend([], doctorData);
    public selectedDate: Date = new Date(2018, 3, 1);
    public currentView: View = 'WorkWeek';
    public allowResizing: boolean = false;
    public allowDragDrop: boolean = false;
    public resourceDataSource: Object[] = [

        { text: 'Hema@ 38 Astoria', id: 1, color: '',  workDays: [1, 2],startHour: '02:00', endHour: '07:00' },
        { text: 'Hema@ 45 DEAN', id: 2, color: '', workDays: [1, 3, 5], startHour: '12:00', endHour: '08:00' },
        { text: 'Hema@ 45 West NY ', id: 3, color: '', startHour: '11:00', endHour: ':00' }
    ];
    public group: GroupModel = { resources: ['Doctors'] };
    public eventSettings: EventSettingsModel = {
        dataSource: this.data,
        fields: {
            subject: { title: 'Service Type', name: 'Subject' },
            location: { title: 'Patient Name', name: 'Location' },
            description: { title: 'Summary', name: 'Description' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' }
        }
    };
    // @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

  getDoctorName(value: ResourceDetails | TreeViewArgs): string {
    return ((value as ResourceDetails).resourceData) ?
        (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
        : (value as TreeViewArgs).resourceName;
}
getDoctorImage(value: ResourceDetails | TreeViewArgs): string {
    let resourceName: string = this.getDoctorName(value);
    return resourceName.replace(' ', '-').toLowerCase();
}
getDoctorLevel(value: ResourceDetails | TreeViewArgs): string {
    let resourceName: string = this.getDoctorName(value);
    return (resourceName === 'Will Smith') ? 'Capiola david' :  ( resourceName === '') ? '' : 'Dr Capiola David';
}

onActionBegin(args: ActionEventArgs): void {
    let isEventChange: boolean = (args.requestType === 'eventChange');
    if ((args.requestType === 'eventCreate' && (<Object[]>args.data).length > 0) || isEventChange) {
        let eventData: { [key: string]: Object } = (isEventChange) ? args.data as { [key: string]: Object } :
            args.data[0] as { [key: string]: Object };
        let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
        let startDate: Date = eventData[eventField.startTime] as Date;
        let endDate: Date = eventData[eventField.endTime] as Date;
        let resourceIndex: number = [1, 2, 3].indexOf(eventData.DoctorId as number);
        args.cancel = !this.isValidateTime(startDate, endDate, resourceIndex);
        if (!args.cancel) {
            args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
        }
    }
}

isValidateTime(startDate: Date, endDate: Date, resIndex: number): boolean {
    let resource: ResourceDetails = this.scheduleObj.getResourcesByIndex(resIndex);
    let startHour: number = parseInt(resource.resourceData.startHour.toString().slice(0, 2), 10);
    let endHour: number = parseInt(resource.resourceData.endHour.toString().slice(0, 2), 10);
    return (startHour <= startDate.getHours() && endHour >= endDate.getHours());
}

onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.target && args.target.classList.contains('e-work-cells')) {
        args.cancel = !args.target.classList.contains('e-work-hours');
    }
}

onRenderCell(args: RenderCellEventArgs): void {
    if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
        addClass([args.element], ['willsmith', 'alice', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
    }
}

  ngOnInit() {

    // ----------FORM-----------

    this.details=this.fb.group({
        patientname:new FormControl(null,Validators.required),
        patientDOB:new FormControl(null),
        phone:new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]),
        email:new FormControl(null,[Validators.required,Validators.email])
      });

      this.callerdetails=this.fb.group({
        callername:new FormControl(null,Validators.required),
        phoneno:new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),Validators.required])
      });

      this.general=this.fb.group({
        firstname:new FormControl(null,Validators.required),
        middlename:new FormControl(null),
        lastname:new FormControl(null,Validators.required),
        dob:new FormControl(null),
        gender: new FormControl(null,Validators.required)
      });

      this.address = this.fb.group({
        address1: new FormControl(null),
        address2: new FormControl(null),
        zip: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null)
      });

      this.contact=this.fb.group({
        home:new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]),
        cell:new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]),
        workphone:new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]),
        email:new FormControl(null,[Validators.required,Validators.email]),
        mode:new FormControl(null)
      });

      this.other = this.fb.group({
        ssn: new FormControl(null),
        language: new FormControl(null)
      });

      this.filteredRelation = this.control.valueChanges.pipe(
        startWith(''),
    map(value => this._filter(value))
      );
    //-------------FORM END-----------------------------

    this._data.getAllData().subscribe(
      (data:Specaility[]) =>{
this.arrspe = data;
this.arr1 = data;
      }
    );

  }

  openEdit(contents) {

    // console.log('popup open');
    // this.modalService.open(contents, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
     this.modalService.open(contents, {size:'lg'});
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  onClickOD() {
    this.officeDashboard =true;
    this.adjusterDashboard =false;
  }
  onClickAD() {
    this.adjusterDashboard = true ;
    this.officeDashboard = false;
  }

//   onClickForm(){

//   }

// -----------FORM---------------
openform(reg, content1, i) {

    let pn = this.details.get('patientname').value;
    console.log(pn);

    for (let i = 0; i < this.arr.length; i--) {
      let pname = this.arr[i].patname;
      console.log(this.arr.length);
      console.log(pname);
      if (pname === pn) {
        console.log('pname');
        this.modalService.open(content1, { size: 'lg' });

      }
      //  if(this.details.value.patientname.value === this.patname){
      //     console.log('pname');
      //     this.modalService.open(content1, { size: 'xl' });
      //          }
      else {
        console.log(pn);

        this.general.patchValue({
          firstname: this.details.value.patientname
        });

        this.modalService.open(reg, { size: 'lg' });
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.relations.filter(relation => this._normalizeValue(relation).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  checked:boolean = false;

  addprop1(e){
    if(e.target.checked){
      this.checked = true;
    }else{
      this.checked = false;
    }
  }
  //-----------FORM END-----------------

}
