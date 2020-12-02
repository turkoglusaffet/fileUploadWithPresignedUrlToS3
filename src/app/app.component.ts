import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadService } from './file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  form: FormGroup;
  percent = 0;

  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService
  ) {
    this.form = this.fb.group({
      name: [''],
      uploadingFile: [null]
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      uploadingFile: file
    });
    this.form.get('uploadingFile').updateValueAndValidity();
  }

  submitFile() {
    this.fileUploadService.uploadFile(
      this.form.value.name,
      this.form.value.uploadingFile
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percent = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percent}%`);
          break;
        case HttpEventType.Response:
          console.log('File successfully uploaded!', event.body);
          setTimeout(() => {
            this.percent = 0;
          }, 1500);

      }
    })
  }

}
