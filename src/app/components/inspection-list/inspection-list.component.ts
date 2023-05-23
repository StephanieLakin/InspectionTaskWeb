
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopyRequestDto } from '../../models/copyRequestDto';
import { Inspection } from '../../models/inspection';
import { InspectionService } from '../../services/inspectionService';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {
  inspections: Inspection[] = [];

  constructor(
    private inspectionService: InspectionService,
    private snackBar: MatSnackBar
  ) { }


  // calling the getInspections method when component is initialized to
  // obtain the list of inspections from the InspectionService.
  ngOnInit(): void {
    this.getInspections();
  }

   // calling the getInspections method in the InspectionService, 
   // which makes an HTTP GET request to the API endpoint.      
  getInspections(): void {
    this.inspectionService.getInspections()
      .subscribe(
        (inspections: Inspection[]) => {
          this.inspections = inspections;
        },     
        error => {
          console.error('Failed to obtain inspections:', error);
          this.handleError();
        }
      );
  }
  // Copy an inspection & show error if issue occurs
  copyInspection(inspection: Inspection): void {
    const copyRequest: CopyRequestDto = {
      CopyInspectionId: inspection.id,
      AssignedToPersonId: inspection.assignedToPersonId
    };
    this.inspectionService.copyInspection(copyRequest)
      .subscribe(
        () => {
          this.showSuccessSnackBar();
        },
        error => {
          console.error('Failed to copy inspection:', error);
          this.showFailureSnackBar();
        }
      );
  }
 // Shows snackbars(toast) with the given message 
  showSuccessSnackBar(){
    this.snackBar.open("Inspection copied successfully!", "Success!", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success-snackbar'],
     });
    }

    showFailureSnackBar(){
      this.snackBar.open('Failed to copy inspection.', 'Error!!', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['fail-snackbar'],
        });
       }      

// Handles error while obtaining inspections
  handleError(): void {
    this.showFailureSnackBar()}
  }

  
