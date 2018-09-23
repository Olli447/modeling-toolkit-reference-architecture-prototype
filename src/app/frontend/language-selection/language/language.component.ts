import {Component, Inject, Input, OnInit} from '@angular/core';
import {Language} from '../../../core/classes/language';
import {LoadingScreenService} from '../../../service/loading-screen.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LoadingStatus, LoadingStatusEvent} from '../../../core/classes/loadingStatusEvent';
import {ModellingManagerService} from '../../../core/modelling-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
/**
 * This component represents a single language.
 * */
export class LanguageComponent implements OnInit {
  @Input() language: Language;

  constructor
  (
      public dialog: MatDialog,
      public loadingScreenService: LoadingScreenService,
      public modellingManager: ModellingManagerService,
      public router: Router
  ) {  }

  ngOnInit() {
  }

    /**
     * This function is being called if you press the load button
     * */
    onClickLoad() {
        // Opens the load dialog
        const dialogRef = this.dialog.open(LanguageLoadDialog, {
            data: { language: this.language},
        });

        // Get the result of the load dialog when available via observable
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Activate Loading Screen
                this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.PENDING, null, 'Preparing to load model'));

                // Get the file and load it via FileReader
                const file: File = result;
                const reader = new FileReader();
                this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.WORKING, null, 'Loading model file'));
                reader.readAsText(file);
                reader.onload = () => {
                    // When finished send the modelData to the modellingManager (The ModellingAreaComponent will look there for loaded data)
                    this.modellingManager.rawModelData = reader.result;
                    /* Init change of route to modelling tool. Be sure to wait 0.5 sec
                    (For small files the loading is so fast that the loading screen is only a yellow blink. That is very disturbing for the UX).
                    (The LoadingScreen needs 400ms to build)
                    */
                    this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.WORKING, null, 'Loading modelling Language'));
                    setTimeout(() => {this.router.navigate(['/modelling', this.language.id]); }, 500);
                };
            }
        });
    }

    /**
     * This method is being called if you press the new button
     * */
    onClickNew() {
      // init route change
      this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.PENDING, null, 'Loading modelling Language'));
      setTimeout(() => {this.router.navigate(['/modelling', this.language.id]); }, 500);
    }
}

export interface DialogData {
    language: Language;
}

@Component({
    selector: 'app-language-load-dialog',
    templateUrl: 'language-load-dialog.html',
})
/**
 * This is the Dialog that appears if you press load
 * */
export class LanguageLoadDialog {

    constructor(
        public dialogRef: MatDialogRef<LanguageLoadDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFileChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            this.dialogRef.close(file);
        }
    }

}
