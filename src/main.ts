import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//bootstrapApplication(AppComponent, appConfig)
//  .catch((err) => console.error(err));

// new
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';  // 导入 AppModule

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));  // 启动应用，并捕获可能的错误
