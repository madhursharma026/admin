import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../styles/movieDetails.module.css'

export default function movieDetail() {

    let movie_id = ""
    const [ID, setID] = useState("")
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [loading, setloading] = useState(false)
    const [filmDetails, setFilmDetails] = useState("")
    const [movieDetails, setMovieDetails] = useState("")
    const [subtitleFile, setSubtitleFile] = useState("")

    useEffect(() => {
        movie_id = localStorage.getItem("movie_id");
        fetch(`http://localhost:3000/admin/singleFilm/${movie_id}`)
            .then(response => response.json())
            .then(response => {
                setloading(false)
                setloading(true)
                setMovieDetails(response);
                handleClose()
                fetch(`http://localhost:3000/admin/findOneFilm/${movie_id}`)
                    .then(response => response.json())
                    .then(response => {
                        setloading(false)
                        setloading(true)
                        setFilmDetails(response);
                        handleClose()
                        console.log(response);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [])

    async function submitForm(e) {
        e.preventDefault()
        movie_id = localStorage.getItem("movie_id");
        let formdata = new FormData();
        formdata.append("subtitle", subtitleFile);
        let result = await fetch(`http://localhost:3000/admin/${ID}`, {
            method: "PATCH",
            body: formdata
        })
        let output = ""
        output = await result.json()
        if (output.movie_id === movie_id) {
            fetch(`http://localhost:3000/admin/singleFilm/${movie_id}`)
                .then(response => response.json())
                .then(response => {
                    setloading(false)
                    setloading(true)
                    setMovieDetails(response);
                    handleClose()
                    console.log(response);
                })
                .catch(err => console.error(err));
        } else {
            console.log(err => console.error(err))
        }
    }

    async function deleteSubtitleFunction(deleteID) {
        movie_id = localStorage.getItem("movie_id");
        let result = await fetch(`http://localhost:3000/admin/delete_subtitle/${deleteID}`, {
            method: "PATCH",
            body: ""
        })
        let output = ""
        output = await result.json()
        if (output.movie_id === movie_id) {
            fetch(`http://localhost:3000/admin/singleFilm/${movie_id}`)
                .then(response => response.json())
                .then(response => {
                    setloading(false)
                    setloading(true)
                    setMovieDetails(response);
                    handleClose()
                    console.log(response);
                })
                .catch(err => console.error(err));
        } else {
            console.log(err => console.error(err))
        }
    }

    return (
        <div className='container-lg'>
            <h1 className="text-center"><u><b>Movie Detail- {movieDetails.id}</b></u></h1>
            {loading ?
                <table class="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col" className={`${styles.hideAfterLGScrn}`}>Id</th>
                            <th scope="col">Movie Id</th>
                            <th scope="col" className={`${styles.hideAfterLGScrn}`}>Format</th>
                            <th scope="col">Subtitle</th>
                            <th scope="col">Edit Subtitle</th>
                            <th scope="col">Delete Subtitle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className={`${styles.hideAfterLGScrn}`}>{movieDetails.id}</th>
                            <td>{filmDetails.title}</td>
                            <td className={`${styles.hideAfterLGScrn}`}>{movieDetails.format}</td>
                            <td>{(`${(movieDetails.subtitle)}` === "") ? "no" : <img src={`http://localhost:3000/public/${movieDetails.subtitle}`} alt="#ImgNotFound" width='35px' height='35px' />}</td>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={handleShow}><b>Add <span className={`${styles.hideAfterLGScrn}`}>Subtitle</span></b></button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={() => deleteSubtitleFunction(`${movieDetails.id}`)}><b>Delete <span className={`${styles.hideAfterLGScrn}`}>Subtitle</span></b></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                :
                <div className="text-center mt-5">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Subtitle</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => submitForm(e)}>
                    <Modal.Body>
                        <input type="file" className='w-100 form-control' required onChange={(e) => (setSubtitleFile(e.target.files[0]), setID(`${movieDetails.id}`))} accept="image/png, image/gif, image/jpeg" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type='submit'>
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}
