import { GridQueryParams } from 'projects/insite-kit/src/models/grid.model';

/**
 * Grid param builder class
 *
 * @author Sam Butler
 * @since February 18, 2023
 */
export class GridParamBuilder {
  private params: GridQueryParams = new Map<string, string[]>();

  /**
   * Add paging params to the query params object.
   *
   * @param page The current page of the grid.
   * @param size The page size of the grid.
   * @returns The current Grid param builder instance.
   */
  withPaging(page: number, size: number): GridParamBuilder {
    const rowOffsetSize = (page - 1) * size;

    this.params.set('pageSize', [size.toString()]);
    this.params.set('rowOffset', [rowOffsetSize.toString()]);
    return this;
  }

  /**
   * Adds search param to the query params object.
   *
   * @param search The search object to be added.
   * @returns The current Grid param builder instance.
   */
  withSearch(search): GridParamBuilder {
    if (search && search != '') {
      this.params.set('search', [search]);
    } else {
      this.params.delete('search');
    }
    return this;
  }

  /**
   * The current query params data.
   *
   * @returns The grid query params.
   */
  build(): GridQueryParams {
    return this.params;
  }
}
