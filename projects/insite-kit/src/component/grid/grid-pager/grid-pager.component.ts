import { Component, Input } from '@angular/core';
import { faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'ik-grid-pager',
  templateUrl: './grid-pager.component.html',
})
export class GridPagerComponent {
  @Input() pageSize = 15;
  @Input() key = '';
  @Input() pagerVisible = true;

  backwardStepIcon = faBackwardStep;
  forwardStepIcon = faForwardStep;

  dataLength = 0;
  totalPages = 0;
  activePage = 1;
  pages: any[];

  pageChange = new Subject<number>();

  update(dataSize: number, page: number) {
    this.dataLength = dataSize;
    this.activePage = page;
    this.totalPages = Math.ceil(dataSize / this.pageSize);
    this.updatePageFooter(this.activePage);
  }

  triggerPageChange(page: number) {
    this.pageChange.next(page);
  }

  pageClick(page: number) {
    this.activePage = page;
    this.triggerPageChange(this.activePage);
  }

  onNextPageClick() {
    if (this.activePage < this.totalPages) {
      this.triggerPageChange(++this.activePage);
    }
  }

  onPreviousPageClick() {
    if (this.activePage > 1) {
      this.triggerPageChange(--this.activePage);
    }
  }

  updatePageFooter(page: number) {
    this.activePage = page;

    if (page === 1) {
      this.pages = [page, page + 1, page + 2];
    } else if (page === this.totalPages) {
      this.pages = [page - 2, page - 1, page];
    } else {
      this.pages = [page - 1, page, page + 1];
    }
  }
}
