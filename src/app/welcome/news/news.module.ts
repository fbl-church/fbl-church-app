import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { NewsOverviewComponent } from './news-overview/news-overview.component';
import { NewsComponent } from './news.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [NewsComponent, NewsOverviewComponent],
})
export class NewsModule {}
