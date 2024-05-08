import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Mostrar el spinner para todas las solicitudes HTTP
    this.loadingService.show();
    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide()) // Ocultar el spinner cuando la solicitud se complete o falle
    );
  }
}
