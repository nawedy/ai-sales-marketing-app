
export interface AnalyticsSummary {
  totalPageViews: number;
  totalProductViews: number;
  totalContactForms: number;
  totalDownloads: number;
  totalSignups: number;
  topProducts: Array<{ productId: number; views: number; productName: string }>;
  recentEvents: Array<{ eventType: string; count: number; date: string }>;
}

export declare function getAnalyticsSummary(days?: number): Promise<AnalyticsSummary>;
