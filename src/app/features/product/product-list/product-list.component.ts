import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StockAPI_Send, StockView } from '../../../model/view-model/stock';
import { StockService } from '../stock.service';
import { isPlatformBrowser } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';


@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  stocks: StockView[] = [];
  paginatedStocks: StockView[] = [];
  error: string | null = null;
  currentPageIndex: number = 0;
  pageSize: number = 12;
  memberCode: string = 'SR0000728';
  isEvent: boolean = false;
  totalCount: number = 0;
  loading: boolean = false;
  currentTimestamp = new Date().getTime();


  constructor(private stockService: StockService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPrdLst();
    }
  }

  loadPrdLst(): void {
    this.loading = true;
    const dataSend: StockAPI_Send = this.getStkAPISend();

    this.stockService.getStockList(dataSend, this.memberCode)
      .subscribe({
        next: (data: StockView[]) => {
          this.stocks = data;
          this.totalCount = data.length;
          this.paginateStocks();
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.message;
          this.loading = false;
        }
      });
  }

  // Method to handle page change
  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateStocks();
  }

  paginateStocks(): void {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStocks = this.stocks.slice(startIndex, endIndex);
  }

  private getStkAPISend(): StockAPI_Send {
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
      pageIndex: 0,
      pageSize: 1000,
      priceRangeStart: priceRangeStart,
      priceRangeEnd: priceRangeEnd,
      isEvent: this.isEvent,
      promoCode: '',
      stkCode: ''
    };
  }
}
