export type Film = {
  id: string;
  title: string;
  year: number;
  format: string;
  actors: Actor[];
};

export type FormFilm = {
  title: string;
  year: number;
  format: string;
  actors: string[];
};

export type Actor = {
  id: string;
  name: string;
};
