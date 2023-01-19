export interface Book {
  bookId?: number;
  title: string;
  genres: BookGenre;
  status?: BookStatus;
  author: Author;
  version: number;
  publicationDate: string;
  imageUrl: string;
  userId?: number;
}

export interface Author {
  firstName: string;
  lastName: string;
}

export enum Condition {
  Unknown = 0,
  Equal = 2,
  Contains = 3,
  GreaterThan = 4,
  LesserThan = 5,
}

export enum Property {
  Title = "title",
  Version = "version",
  Date = "publicationDate",
}

export enum BookGenre {
  Action = 1,
  Comedy = 2,
  Drama = 4,
  Musical = 8,
  Thriller = 16,
  Horror = 32,
  Romance = 64,
  Fantasy = 128,
  TravelLiterature = 256,
}

export enum BookSorting {
  Title,
  Genres,
  Status,
  Author,
  Version,
  PublicationDate,
}

export enum BookStatus {
  Nieznany,
  Dostępna,
  Wypożyczona,
}

export function getSelectedBookGenre(genre: number) {
  let selectedGenre = "";
  if ((genre & BookGenre.Action) === BookGenre.Action) {
    selectedGenre += "Akcji ";
  }
  if ((genre & BookGenre.Comedy) === BookGenre.Comedy) {
    selectedGenre += "Komedia ";
  }
  if ((genre & BookGenre.Drama) === BookGenre.Drama) {
    selectedGenre += "Dramat ";
  }
  if ((genre & BookGenre.Fantasy) === BookGenre.Fantasy) {
    selectedGenre += "Fantasy ";
  }
  if ((genre & BookGenre.Horror) === BookGenre.Horror) {
    selectedGenre += "Horror ";
  }
  if ((genre & BookGenre.Musical) === BookGenre.Musical) {
    selectedGenre += "Musical ";
  }
  if ((genre & BookGenre.Romance) === BookGenre.Romance) {
    selectedGenre += "Romans ";
  }
  if ((genre & BookGenre.Thriller) === BookGenre.Thriller) {
    selectedGenre += "Thriller ";
  }
  if ((genre & BookGenre.TravelLiterature) === BookGenre.TravelLiterature) {
    selectedGenre += "Podróżnicza ";
  }
  return selectedGenre;
}

export function getSelectedGenresList(genre: number) {
  let genres: number[] = [];
  if ((genre & BookGenre.Action) === BookGenre.Action) {
    genres.push(BookGenre.Action);
  }
  if ((genre & BookGenre.Comedy) === BookGenre.Comedy) {
    genres.push(BookGenre.Comedy);
  }
  if ((genre & BookGenre.Drama) === BookGenre.Drama) {
    genres.push(BookGenre.Drama);
  }
  if ((genre & BookGenre.Fantasy) === BookGenre.Fantasy) {
    genres.push(BookGenre.Fantasy);
  }
  if ((genre & BookGenre.Horror) === BookGenre.Horror) {
    genres.push(BookGenre.Horror);
  }
  if ((genre & BookGenre.Musical) === BookGenre.Musical) {
    genres.push(BookGenre.Musical);
  }
  if ((genre & BookGenre.Romance) === BookGenre.Romance) {
    genres.push(BookGenre.Romance);
  }
  if ((genre & BookGenre.Thriller) === BookGenre.Thriller) {
    genres.push(BookGenre.Thriller);
  }
  if ((genre & BookGenre.TravelLiterature) === BookGenre.TravelLiterature) {
    genres.push(BookGenre.TravelLiterature);
  }
  return genres;
}
