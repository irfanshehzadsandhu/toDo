const perPage = 10;
module.exports = class Pagination {
  constructor(page, totalDocuments) {
    this.page = page;
    this.totalDocuments = totalDocuments;
  }
  perPage() {
    return perPage;
  }
  currentPage() {
    return this.page;
  }

  totalPages() {
    return Math.ceil(this.totalDocuments / perPage);
  }

  hasNext() {
    return this.currentPage() < this.totalPages();
  }

  nextPage() {
    return parseInt(this.currentPage()) + 1;
  }
  hasPrev() {
    return this.currentPage() > 1;
  }

  prevPage() {
    return this.currentPage() - 1;
  }
  offset() {
    return this.prevPage() * perPage; //We will skip previous records
  }

  paginationInfo() {
    const info = {
      totalPages: this.totalPages(),
      currentPage: this.currentPage(),
      offset: this.offset(),
      limit: perPage
    };
    if (this.hasNext()) {
      info.nextPage = this.nextPage();
    }
    if (this.hasPrev()) {
      info.prevPage = this.prevPage();
    }
    return info;
  }
};
