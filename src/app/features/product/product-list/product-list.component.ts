import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StockAPI_Send, StockView } from '../../../model/view-model/stock';
import { StockService } from '../stock.service';
import { isPlatformBrowser } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  stocks: StockView[] = [];
  error: string | null = null;
  currentPageIndex: number = 1;
  pageSize: number = 12;
  memberCode: string = 'SR0000728';
  isEvent: boolean = false;
  totalCount: number = 0;

  constructor(private stockService: StockService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPrdLst(this.currentPageIndex);
    }
  }

  loadPrdLst(currentPageIndex: number): void {
    const dataSend: StockAPI_Send = this.getStkAPISend(currentPageIndex, this.pageSize);

    this.stockService.getStockList(dataSend, this.memberCode)
      .pipe(untilDestroyed(this))
      .subscribe(
        {
          next: (data: StockView[]) => {
            this.stocks = data;
            this.totalCount = data.length > 0 ? data[0].totalCount : 0;
            this.error = null; // Reset error on success
          },
          error: (err: any) => {
            console.log('Error loading product list:', err); // Log error to console
            this.error = 'Error loading product list'; // Generic error message
          }
        }
      );
  }

  // Method to handle page change
  onPageChange(pageIndex: number): void {
    this.currentPageIndex = pageIndex;
    this.loadPrdLst(this.currentPageIndex);
  }

  private getStkAPISend(pageIndex: number, pageSize: number): StockAPI_Send {
    const categoryLst: string[] = [];
    const affordAmt = 0;
    const keyword = '';  // You can set this from a search input or other source
    const priceRangeStart = 0;  // Set these as required
    const priceRangeEnd = 1000;  // Set these as required

    return {
      affordAmt: affordAmt,
      categoryList: categoryLst,
      keyword: keyword,
      memberCode: this.memberCode,
      pageIndex: pageIndex - 1,
      pageSize: pageSize,
      priceRangeStart: priceRangeStart,
      priceRangeEnd: priceRangeEnd,
      isEvent: this.isEvent,
      promoCode: '',
      stkCode: ''
    };
  }
  totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
  pagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  }
}
