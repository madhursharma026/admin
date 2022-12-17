import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

export default function Home() {

  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [movieDetails, setMovieDetails] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3000/admin/findAllFilmDetails`)
      .then(response => response.json())
      .then(response => {
        setloading(true)
        setMovieDetails(response);
        console.log(response);
      })
      .catch(err => console.error(err));
  }, [])

  function viewPageFunction(movie_id) {
    localStorage.setItem("movie_id", movie_id);
    router.push('movieDetail')
  }

  return (
    <div className="container-lg">
      <h1 className="text-center"><u><b>Film Details</b></u></h1>
      {loading ?
        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Movie Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              movieDetails.map((movieDetails, i) =>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{movieDetails.title}</td>
                  <td>
                    <button type="button" class="btn btn-primary" onClick={() => viewPageFunction(`${movieDetails.id}`)}><b>View</b></button>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        :
        <div className="text-center mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </div>
  )
}
