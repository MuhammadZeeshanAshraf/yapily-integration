export class PagedList<T> {
  public items: T[];

  public totalCount: number;

  public take: number;

  public currentPage: number;

  public remainingPages: number;

  public totalPages: number;

  /** TODO : CHANGE THE TYPE FROM ANY TO THE DTO */
  public filters: any;

  public constructor(
    items: T[],
    totalCount: number,
    take: number,
    currentPage: number,
    filters?: any,
  ) {
    this.items = items;
    this.totalCount = totalCount;
    this.take = take;
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(totalCount / take);
    this.remainingPages = Math.ceil((totalCount - take * currentPage) / take);
    this.remainingPages = this.remainingPages < 0 ? 0 : this.remainingPages;
    this.filters = filters;
  }
}
