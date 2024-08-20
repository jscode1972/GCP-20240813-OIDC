import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 判断请求是否为你的 Web API 的 URL
    const isApiUrl =
      req.url.startsWith('http://localhost:4200') ||
      req.url.startsWith('http://localhost:9000') ||
      req.url.startsWith('https://your-api-domain.com');

    // 克隆请求并添加 withCredentials 选项
    const clonedRequest = req.clone({
      withCredentials: isApiUrl
    });

    // 将克隆后的请求传递给下一个处理程序
    return next.handle(clonedRequest);
  }
}
