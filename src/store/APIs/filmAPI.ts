export const getFilmById = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:8000/api/v1/movies/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getAllFilms = async (token: string) => {
  const response = await fetch(
    'http://localhost:8000/api/v1/movies?sort=year&order=DESC&limit=10&offset=0',
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
