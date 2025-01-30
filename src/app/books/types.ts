export type BookApiItem = {
  id: string;
  country: string;
  imageLink: string;
  language: string;
  author: string;
  link: string;
  pages: number;
  title: string;
  year: number;
};

export type BookSummaryItemModel = Pick<
  BookApiItem,
  'id' | 'title' | 'author' | 'year'
>;
