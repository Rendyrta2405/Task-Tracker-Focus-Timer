export const getListVideos = async () => {
   const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
   const randomPage = Math.floor(Math.random() * 20)+ 1;
   const url = `https://pixabay.com/api/videos/?key=${API_KEY}&page=${randomPage}`;

   try {
      const response = await fetch(url);

      if (!response.ok) {
         console.log("Failed to fetch videos")
      }

      const data = await response.json();
      return data.hits;
   } catch (error) {
      // console.log(error);
      console.log('Failed when fetching videos data from Pixabay', error);
      return [];
   }
};
