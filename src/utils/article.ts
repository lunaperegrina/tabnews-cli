export interface Article {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: "published" | "draft" | "deleted"; // Assuming status can be "draft" or "deleted" as well
  source_url: string | null;
  created_at: string; // Assuming this is a ISO 8601 date string
  updated_at: string; // Assuming this is a ISO 8601 date string
  published_at: string | null; // Assuming this is a ISO 8601 date string
  deleted_at: string | null; // Assuming this is a ISO 8601 date string
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  owner_username: string;
  children_deep_count: number;
}