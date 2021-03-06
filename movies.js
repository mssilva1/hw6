// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

let db = firebase.firestore()
window.addEventListener('DOMContentLoaded', async function(event) {

    let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=94ba867a0abf4afb5488edc0c120064e'
    let response = await fetch(url)
    let movies = await response.json()
    console.log(movies)
    
    let moviesPath = document.querySelector('.movies')
        moviesPath.insertAdjacentHTML('beforeend',`
            <div class="w-full text-4xl font-bold text-white p-8 text-center"> 
                Movies playing 
            </div>
        `) 

    for (let i = 0; i<movies.results.length;i++){
        let moviesTitles = movies.results[i].original_title
        let moviesImagesPre = movies.results[i].poster_path
        let movieId = movies.results[i].id
        // console.log(movieId)
        let movieImage = `https://image.tmdb.org/t/p/w500/${moviesImagesPre}`
    
        moviesPath.insertAdjacentHTML('beforeend',`
        <div class="w-1/4 p-4 text-white movie-${movieId}">
            ${moviesTitles} 
           <img src="${movieImage}" class="w-full">
           <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
        </div>          
        `) 

        let watchedButton = document.querySelector(`.movie-${movieId}`)
        watchedButton.addEventListener('click', async function(event){
            // console.log(`button with ID ${movieId} clicked!`)
            event.preventDefault()
            watchedButton.classList.add('opacity-20')
            await db.collection('watched').add({
                id: movieId
            })
        })
    
        let querySnapshot = await db.collection('watched').get()
 
        let watched = querySnapshot.docs
        for (let i=0; i<watched.length;i++ ){
          let watchedId = watched[i].id  
          let watchedData = watched[i].data()
        //   console.log(watchedData)
          let watchedText = watchedData.text 
            if (watchedData.id == movieId){
                document.querySelector(`.movie-${movieId}`).classList.add('opacity-20')
            }

            // let watchedOpaque = document.querySelector(`.movie-${movieId}`)
            // watchedOpaque.addEventListener('click', async function (event){
            //     event.preventDefault()
            //     watchedOpaque.classList.remove('opacity-20')
            //     await db.collection('watched').doc(watchedId).set({})
            // })
            
        }
      


    }


    // Step 1: Construct a URL to get movies playing now from TMDB, fetch
    // data and put the Array of movie Objects in a variable called
    // movies. Write the contents of this array to the JavaScript
    // console to ensure you've got good data
    // ⬇️ ⬇️ ⬇️
  
    // ⬆️ ⬆️ ⬆️ 
    // End Step 1
    
    // Step 2: 
    // - Loop through the Array called movies and insert HTML
    //   into the existing DOM element with the class name .movies
    // - Include a "watched" button to click for each movie
    // - Give each "movie" a unique class name based on its numeric
    //   ID field.
    // Some HTML that would look pretty good... replace with real values :)
    // <div class="w-1/5 p-4 movie-abcdefg1234567">
    //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
    //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
    // </div>
    // ⬇️ ⬇️ ⬇️
  
    // ⬆️ ⬆️ ⬆️ 
    // End Step 2
  
    // Step 3: 
    // - Attach an event listener to each "watched button"
    // - Be sure to prevent the default behavior of the button
    // - When the "watched button" is clicked, changed the opacity
    //   of the entire "movie" by using .classList.add('opacity-20')
    // - When done, refresh the page... does the opacity stick?
    // - Bonus challenge: add code to "un-watch" the movie by
    //   using .classList.contains('opacity-20') to check if 
    //   the movie is watched. Use .classList.remove('opacity-20')
    //   to remove the class if the element already contains it.
    // ⬇️ ⬇️ ⬇️
  
    // ⬆️ ⬆️ ⬆️ 
    // End Step 3
  
    // Step 4: 
    // - Properly configure Firebase and Firebase Cloud Firestore
    // - Inside your "watched button" event listener, you wrote in
    //   step 3, after successfully setting opacity, persist data
    //   for movies watched to Firebase.
    // - The data could be stored in a variety of ways, but the 
    //   easiest approach would be to use the TMDB movie ID as the
    //   document ID in a "watched" Firestore collection.
    // - Hint: you can use .set({}) to create a document with
    //   no data – in this case, the document doesn't need any data;
    //   if a TMDB movie ID is in the "watched" collection, the 
    //   movie has been watched, otherwise it hasn't.
    // - Modify the code you wrote in Step 2 to conditionally
    //   make the movie opaque if it's already watched in the 
    //   database.
    // - Hint: you can use if (document) with no comparison
    //   operator to test for the existence of an object.
  })