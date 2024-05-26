export const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:5028/api/Movies");
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
  
  export const fetchMovieById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5028/api/Movies/${id}`);
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
  
  export const searchMoviesByTitle = async (title) => {
    try {
      const response = await fetch(`http://localhost:5028/api/Movies/searchTitle/${title}`);
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