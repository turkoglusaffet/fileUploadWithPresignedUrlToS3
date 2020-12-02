import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(name: string, uploadingFile: File): Observable<any> {
    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('file', uploadingFile);
    return this.http.put('https://saffet-demo.s3.amazonaws.com/testfile.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATVKLKNDP7MTLBZ6L%2F20201201%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20201201T083904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=394fc2fdb161334b4c083340532eb6805ba76b1ac902864da952c9a7625495ab', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
