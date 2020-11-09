import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { House } from 'src/app/shared/house.model';
import { HouseService } from 'src/app/shared/house.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styles: [
  ]
})

export class HouseListComponent implements OnInit {
closeResult: string;
editForm: FormGroup;
test: string;

  constructor(
    public service: HouseService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.service.refreshList();    
  }

  populateForm(h:House){
    this.test = 'Details';
    this.service.formData = Object.assign({},h);  
  }

  open(test) {
    this.modalService.open(test, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';      
    } 
    
    else {
      return `with: ${reason}`;
    }
  }

  onSubmit(houseForm:NgForm){
    if(this.service.formData.HId==0)
      this.insertRecord(houseForm);
    else
    this.updateRecord(houseForm)

  }

  insertRecord(houseForm:NgForm){
    this.service.postHouse().subscribe(
      res => {
      
        this.service.refreshList();
        this.resetForm(houseForm);
        this.toastr.success("Submitted successfully","House Register");
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(houseForm:NgForm){
    this.service.putHouse().subscribe(
      res => {
        this.resetForm(houseForm);
        this.service.refreshList();
        this.toastr.info("Submitted successfully","House Register");
      },
      err => {
        console.log(err);
      }
    )
  }

  openDetails(targetModal, house: House) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('hCity').setAttribute('value', house.HouseCity);
    document.getElementById('hCountry').setAttribute('value', house.HouseCountry);
    document.getElementById('hNumber').setAttribute('value', house.HouseNumber.toString());
    document.getElementById('hpIndex').setAttribute('value', house.HousePostIndex);
 }
 
  resetForm(houseForm?:NgForm){
    this.test = 'New';
    if (houseForm != null)
    houseForm.resetForm();
    this.service.formData = {
    HId: 0,
    HouseNumber: null,
    HouseCity: '',
    HouseCountry: '',
    HousePostIndex: ''
    }
  }

  // openDetailsModal() {
  //   this.modalRef = this.modalService.show(Content,
  //     {
  //       animated: true,
  //       class: 'details-modal',
  //       initialState: {
  //         houseForm: this.HouseComponent,
  //       }
  //     });
  // }
  
  // open(content) {
  //   this.modalService.open(content);
  // }

  getHouseList(HId) {
  this.service.getHouseFlats(HId);
  }

  onDelete(HId) {
    if(confirm("Are u sure to delete this record ? ")) {
   this.service.deleteHouse(HId)
   .subscribe(res => {
     this.service.refreshList();
     this.toastr.warning("Deleted successfully","House Register");
   },
    err=> {
      console.log(err);
    }) 
  }
}

}
