export const fetchMovies = async () => {
  try {
    const response = await fetch("http://157.230.113.110:5028/api/Movies");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
export const fetchAllUsers = async () => {
  const token = localStorage.getItem('token')?.replace(/["']/g, '');
  try {
    const response = await fetch('http://157.230.113.110:5028/api/userinfo/All', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
export const fetchMoviesWithImages = async () => {
  try {
    const movies = await fetchMovies();
    const moviesWithImages = await Promise.all(movies.map(async (movie) => {
      if (movie.fileName) {
        const imageResponse = await fetch(`http://157.230.113.110:5028/api/LoadImage/${movie.fileName}`);
        if (!imageResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const imageUrl = imageResponse.url; // Assuming this is correct
        return { ...movie, imageUrl };
      } else {
        // If fileName is not defined, return movie without imageUrl
        return { ...movie, imageUrl: null };
      }
    }));
    return moviesWithImages;
  } catch (error) {
    console.error("There was a problem with fetching movies with images:", error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await fetch(`http://157.230.113.110:5028/api/Movies/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
export const fetchUserCatalogs = async () => {
  const token = localStorage.getItem('token')?.replace(/["']/g, '');
  const response = await fetch('http://157.230.113.110:5028/api/catalogs', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch catalogs');
  }
};
export const searchMoviesByTitle = async (title) => {
  try {
    const response = await fetch(`http://157.230.113.110/:5028/api/Movies/searchTitle/${title}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};