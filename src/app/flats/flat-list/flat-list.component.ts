import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Flat } from 'src/app/shared/flat.model';
import { FlatService } from 'src/app/shared/flat.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styles: [
  ]
})
export class FlatListComponent implements OnInit {

 
  closeResult: string;
  editForm: FormGroup;

  constructor(public service: FlatService,
    public toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.resetForm();
    this.service.refreshList();
    this.service.refreshList1();
  }

  populateForm(formFlat:Flat){
    this.service.formData = Object.assign({},formFlat);
  }

  onDelete(FlatId) {
    if(confirm("Are u sure to delete this record ? ")) {
   this.service.deleteFlat(FlatId)
   .subscribe(res => {
     this.service.refreshList();
     this.toastr.warning("Deleted successfully","Flat Register");
   },
    err=> {
      console.log(err);
    }) 
  }
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

resetForm(formFlat?:NgForm){
  if(formFlat != null)
  formFlat.resetForm();
  this.service.formData = {
  FlatId: 0,
  FlatNumber: null,
  FlatFloor: null,
  FlatRoomsAmmount: null,
  FlatResidentAmmount: null,
  FlatFullArea: null,
  FlatLivingSpaceArea:null,
  HouseId: null,


  }
}
onSubmit(formFlat:NgForm){
  if(this.service.formData.FlatId==0)
    this.insertRecord(formFlat);
  else
  this.updateRecord(formFlat)

}


insertRecord(formFlat:NgForm){
  this.service.postFlat().subscribe(
    res => {
      this.resetForm(formFlat);
      this.service.refreshList();
      this.toastr.success("Submitted successfully","House Register");
    },
    err => {
      console.log(err);
    }
  )
}

updateRecord(formFlat:NgForm){
  this.service.putFlat().subscribe(
    res => {
      this.resetForm(formFlat);
      this.service.refreshList();
      this.toastr.info("Submitted successfully","House Register");
    },
    err => {
      console.log(err);
    }
  )
}



}
