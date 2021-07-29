export interface SearchOptions {
  query: string;
  limit: number;
  before: string | null;
  after: string | null;
}

export interface SearchOptionsRepo {
  login: string;
  first: number | null;
  last: number | null;
  before: string | null;
  after: string | null;
}