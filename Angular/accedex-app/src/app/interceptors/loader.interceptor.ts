import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { PokemonsService } from '../services/pokemons.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.includes("pokemon")) {
      return next.handle(request);
    }
    console.warn("LoaderInterceptor");

    const loaderService = this.injector.get(PokemonsService);

    loaderService.show();

    return next.handle(request).pipe(
      delay(3000),
      finalize(() => loaderService.hide())
    );
  }
}
