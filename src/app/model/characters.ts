export interface Character {
  name: string;
  url: string;
  films?: Film[];
}

export interface Film {
  url: string;
  title: string;
  release_date: string;
  opening_crawl: string;
}
