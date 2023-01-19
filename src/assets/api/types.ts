export interface Book {
  title: string;
  genres: BookGenre;
  status?: BookStatus;
  author: Author;
  version: number;
  publicationDate: string;
  imageUrl: string;
}

export interface Author {
  firstName: string;
  lastName: string;
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
