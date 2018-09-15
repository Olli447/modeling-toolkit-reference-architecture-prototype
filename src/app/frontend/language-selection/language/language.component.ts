import {Component, Inject, Input, OnInit} from '@angular/core';
import {Language} from '../../../classes/language';
import {LoadingScreenService} from '../../../service/loading-screen.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LoadingStatus, LoadingStatusEvent} from '../../../classes/loadingStatusEvent';
import {ModellingManagerService} from '../../../core/modelling-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
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

    onClickLoad() {
        const dialogRef = this.dialog.open(LanguageLoadDialog, {
            data: { language: this.language},
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.PENDING, null, 'load modell'));

                const file: File = result;
                // console.log(result);
                // let fileContent: string;
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                    // fileContent = reader.result;
                    this.modellingManager.rawModelData = reader.result;
                    // console.log(fileContent);
                    setTimeout(() => {this.router.navigate(['/modelling', this.language.id]); }, 1000);
                };
            }
        });
    }

    onClickNew() {
      this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.PENDING, null, 'Load modelling Language'));

      setTimeout(() => (
          this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.WORKING, null, 'Create new Model'))
      ), 500);
      setTimeout(() => {this.router.navigate(['/modelling', this.language.id]); }, 1000);
    }
}

export interface DialogData {
    language: Language;
}

@Component({
    selector: 'app-language-load-dialog',
    templateUrl: 'language-load-dialog.html',
})
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
