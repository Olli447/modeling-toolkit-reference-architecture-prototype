import { Injectable } from '@angular/core';
import {ModellingToolkitService} from './modelling-toolkit.service';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private modellingToolkit: ModellingToolkitService
  ) {

  }

  /**
   * Exports the model as a JPEG image
   * */
  exportModel() {
    const image = this.modellingToolkit.modellingAreaComponent.diagram.makeImageData({
      scale: 1,
      background: 'White',
      type: 'image/jpeg',
    });
    const date = new Date();
    const fileName = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' - ' + this.modellingToolkit.currentLanguageID + '.jpeg';

    // In order to download the image you need to do a workaround, because saveAs dont work  with dataUrl's
    // create an link with the download attribute and the dataUrl as ref set
    const link = document.createElement('a');
    link.download = fileName;
    link.href = <string>image;
    // append that link to the site
    document.body.appendChild(link);
    // click the link
    link.click();
    // delete the link
    document.body.removeChild(link);

    // Don't ask me ... it works
  }

  /**
   * Uses GoJS to create an JSON representation of the model.
   * Creates a file with the json as content and offers it to download it
   * */
  saveModel() {
    const modelData = this.exportModelToJSON();
    const date = new Date();
    const fileName = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' - ' + this.modellingToolkit.currentLanguageID + '.json';
    const blob = new Blob([modelData], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, fileName);
    this.modellingToolkit.isModelDataUnsaved = false;
  }

  exportModelToJSON() {
    return this.modellingToolkit.modellingAreaComponent.diagram.model.toJson();
  }
}
