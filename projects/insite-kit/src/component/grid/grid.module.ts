import { NgModule } from '@angular/core';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridSearchComponent } from './grid-search/grid-searchcomponent';
import { GridComponent } from './grid.component';

@NgModule({
  imports: [GridComponent, GridSearchComponent, GridPagerComponent, GridColumnComponent],
  exports: [GridComponent, GridSearchComponent, GridPagerComponent, GridColumnComponent],
})
export class GridModule {}
