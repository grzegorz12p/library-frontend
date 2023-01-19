import { BookGenre, BookSorting, Property } from "./types";
interface KeyValuePair {
  key: string;
  value: string | number;
}

interface Genre {
  value: number;
  label: string;
}

export const filterProperties: KeyValuePair[] = [
  {
    key: "Tytuł",
    value: Property.Title.toString(),
  },
  {
    key: "Wersja",
    value: Property.Version.toString(),
  },
  {
    key: "Data",
    value: Property.Date.toString(),
  },
];

export const sortingProperties: KeyValuePair[] = [
  {
    key: "Tytuł",
    value: BookSorting.Title,
  },
  {
    key: "Wersja",
    value: BookSorting.Version,
  },
  {
    key: "Data",
    value: BookSorting.PublicationDate,
  },
  {
    key: "Gatunki",
    value: BookSorting.Genres,
  },
  {
    key: "Status",
    value: BookSorting.Status,
  },
  {
    key: "Autor",
    value: BookSorting.Author,
  },
];

export const multiSelectOptions: Array<Genre> = [
  {
    value: BookGenre.Action,
    label: "Akcja",
  },
  {
    value: BookGenre.Comedy,
    label: "Komedia",
  },
  {
    value: BookGenre.Drama,
    label: "Dramat",
  },
  {
    value: BookGenre.Musical,
    label: "Musical",
  },
  {
    value: BookGenre.Thriller,
    label: "Thriller",
  },
  {
    value: BookGenre.Horror,
    label: "Horror",
  },
  {
    value: BookGenre.Romance,
    label: "Romance",
  },
  {
    value: BookGenre.Fantasy,
    label: "Fantasy",
  },
  {
    value: BookGenre.TravelLiterature,
    label: "Podróżnicza",
  },
];
