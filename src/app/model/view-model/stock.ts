export interface StockAPI_Send {
  affordAmt: number;
  categoryList: string[];
  keyword: string;
  memberCode: string;
  pageIndex: number;
  pageSize: number;
  priceRangeStart: number;
  priceRangeEnd: number;
  promoCode: string;
  stkCode: string;
  isEvent: boolean;
}

export interface StockView {
  seqNo: number;
  stkCode: string;
  stkName: string;
  displayStkName: string;
  stkCategory: string;
  stkCategory2: string;
  stkCategoryFull: string;
  outrightAmt: number;
  outrightDiscAmt: number;
  minRental: number;
  rpfAmt: number;
  rpfDiscAmt: number;
  pv: number;
  allowOut: boolean;
  allowRen: boolean;
  allowGDP: boolean;
  allowSUP: boolean;
  allowProductCompare: boolean;
  allowProductSpecView: boolean;
  allowAddOnStk: boolean;
  allowCRMSales: boolean;
  checkStockQty: boolean;
  checkStockTypeID: number;
  reserveQty: number;
  sellingFastQty: number;
  specialAddOnQty: number;
  rentalReduce: boolean;
  isBundle: boolean;
  isAddOnStk: boolean;
  isPWPStk: boolean;
  isTaxApply: boolean;
  series: string;
  supplierID: number;
  salesType: string;
  isWonderfulItem: boolean;
  stockInfoURL: string;
  stockDesc: string;
  isAllowNonIndividual: boolean;
  allowEventSales: boolean;
  discPer: number;
  installationMemTypeID: number;
  totalCount: number;
}

