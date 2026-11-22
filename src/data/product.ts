import stock from "./nike_pegasus_size_stock.json";

export type StockStatus = "in_stock" | "low_stock" | "sold_out";

export type SizeStock = {
  sku: string;
  style_code: string;
  product_name: string;
  colorway: string;
  price: number;
  size_label: string;
  size_us_men: number;
  size_us_women: number;
  size_eu: string;
  display_order: number;
  in_stock: boolean;
  stock_quantity: number;
  stock_status: StockStatus;
  launch_date: string;
};

export const sizes: SizeStock[] = (stock as SizeStock[])
  .slice()
  .sort((a, b) => a.display_order - b.display_order);

const first = sizes[0];

export const product = {
  name: first.product_name,
  colorway: first.colorway,
  price: first.price,
  styleCode: first.style_code,
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
