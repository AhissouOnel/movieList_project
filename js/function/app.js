window.onload = () => {
  const API =
    "https://movie-app-a5ca7-default-rtdb.firebaseio.com/movie-app.json";

  var btnConfirm = document.querySelector(".confirm");
  btnConfirm.onclick = (event) => {
    event.preventDefault();
    addMovie();
  };


  const showMovie = () => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        const moviesArray = Object.values(data);
        const manage = document.querySelector(".movie-details");

        if (manage) {
          manage.innerHTML = "";

          moviesArray.forEach((movie) => {
            var movieDetails = `
                    <tr>
                      <td>${movie.title}</td>
                      <td>${movie.director}</td>
                      <td>${movie.year}</td>
                      <td>${movie.author}</td>
                      <td>${movie.category}</td>
                      <td><button class="update" data-id="${movie.id}">Update</button></td>
                      <td><button class="delete" data-id="${movie.id}">Delete</button></td>
                    </tr>           
            `
            manage.innerHTML += movieDetails
          })
        }

        // Ajout des événements aux boutons Update et Delete
        var btnUpdate = document.querySelectorAll(".update");
        var btnDelete = document.querySelectorAll(".delete");

        btnUpdate.forEach((btn) => {
          btn.onclick = (event) => {
            const id = event.target.getAttribute("data-id");
            editMovie(id);
          };
        });

        btnDelete.forEach((btn) => {
          btn.onclick = (event) => {
            const id = event.target.getAttribute("data-id");
            deleteMovie(id);
          };
        });
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };
  //showMovie()
  document.addEventListener("DOMContentLoaded", showMovie());


  const addMovie = () => {
    const id = Math.round(Math.random() * 566155);
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = document.getElementById("year").value.trim();
    const director = document.getElementById("director").value.trim();
    const category = document.getElementById("category").value.trim();

    const movie = { id, title, author, year, director, category };

    if (id && title && author && year && director && category) {
      fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Movie added:", data);
          document.getElementById("title").value = "";
          document.getElementById("author").value = "";
          document.getElementById("year").value = "";
          document.getElementById("director").value = "";
          document.getElementById("category").value = "";
          alert("Movie added !");
        })
        .catch((error) => console.error("Error adding movie:", error));
    } else {
      alert("Please fill in all fields.");
    }
  };


  const editMovie = (id) => {
    console.log("Editing movie with ID:", id);
    const movie = { id, title, author, year, director, category };

    const updatedTitle = prompt('Enter the updated title:');
    const updatedCategory = prompt('Enter the updated category:');
    const updatedAuthor = prompt('Enter the updated author:');
    const updatedYear = prompt('Enter the updated year:');
    const updatedDirector = prompt('Enter the updated director:');

    if (updatedTitle !== null && updatedCategory !== null && updatedAuthor !== null && updatedYear !== null && updatedDirector !== null) {
        const updatedMovie = {
            title: updatedTitle,
            category: updatedCategory,
            author: updatedAuthor,
            year: updatedYear,
            director: updatedDirector
        };

        fetch(API, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Movie updated:', data);
            showMovie()
        })
        .catch(error => console.error('Error updating movie:', error));
    }

    /*if (id === movie.id) {
      const updatedTitle = prompt('Enter the updated title:');
      const updatedCategory = prompt('Enter the updated category:');
      const updatedAuthor = prompt('Enter the updated author:');
      const updatedYear = prompt('Enter the updated year:');
      const updatedDirector = prompt('Enter the updated director:');
  
      if (updatedTitle !== null && updatedCategory !== null && updatedAuthor !== null && updatedYear !== null && updatedDirector !== null) {
          const updatedMovie = {
              title: updatedTitle,
              category: updatedCategory,
              author: updatedAuthor,
              year: updatedYear,
              director: updatedDirector
          };
  
          fetch(API, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedMovie),
          })
          .then(response => response.json())
          .then(data => {
              console.log('Movie updated:', data);
              showMovie()
          })
          .catch(error => console.error('Error updating movie:', error));
      }
    }*/
  };


  const deleteMovie = (id) => {
    console.log("Deleting movie with ID:", id);
    const movie = { id, title, author, year, director, category };

    if (confirm('Are you sure you want to delete this movie?')) {
      fetch(API, {
          method: 'DELETE',
      })
      .then(response => {
          if (response.ok) {
              console.log('Movie deleted');
              showMovie();
          } else {
              console.error('Error deleting movie:', response.status);
          }
      })
      .catch(error => console.error('Error deleting movie:', error));
  }
  };
};
