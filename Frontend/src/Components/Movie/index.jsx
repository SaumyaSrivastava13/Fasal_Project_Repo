import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Tooltip,
  Modal,
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import styles from "./styles.module.css";

const Movie = (props) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const { selectedMovie, setIsOpen } = props;

  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [privacy, setPrivacy] = useState("private"); // State for privacy setting
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/playlist?uid=${localStorage.getItem("uid")}`);
      setPlaylists(response.data.playlists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const addMovieToPlaylist = async (playlistName, movie) => {
    try {
      await axios.post('http://localhost:8080/api/movie', {
        playlistName,
        imdbID: selectedMovie,
        uid: localStorage.getItem("uid")
      });
    } catch (error) {
      console.error('Error adding movie to playlist:', error);
    }
  };

  const createPlaylist = async (playlistName, isPublic) => {
    try {
      await axios.post('http://localhost:8080/api/playlist', {
        name: playlistName,
        movies: [],
        uid: localStorage.getItem("uid"),
        private: !isPublic
      });
      fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=3018d9fc`)
      .then((response) => setMovieInfo(response.data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, [selectedMovie]);

  const handleOpenPlaylistModal = () => setOpenPlaylistModal(true);
  const handleClosePlaylistModal = () => setOpenPlaylistModal(false);
  const handleCreatePlaylist = () => {
    createPlaylist(newPlaylist, privacy === "public");
    setNewPlaylist("");
  };
  const handleSubmit = () => {
    const movie = {
      imdbID: selectedMovie,
      Title: movieInfo.Title,
      Poster: movieInfo.Poster,
    };
    addMovieToPlaylist(selectedPlaylist, movie);
    handleClosePlaylistModal();
    navigate('/dashboard');
  };

  return (
    <div className={styles.cont}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={() => setIsOpen(false)}>
          ×
        </button>
        {movieInfo ? (
          <div className={styles.window}>
            <img
              className={styles.coverimage}
              src={movieInfo.Poster}
              alt={movieInfo.Title}
            />
            <div className={styles.infocolumn}>
              <div className={styles.moviename}>
                {movieInfo.Type}: <span>{movieInfo.Title}</span>
              </div>
              <div className={styles.movieinfo}>
                IMDB Rating: <span>{movieInfo.imdbRating}</span>
              </div>
              <div className={styles.movieinfo}>
                Year: <span>{movieInfo.Year}</span>
              </div>
              <div className={styles.movieinfo}>
                Language: <span>{movieInfo.Language}</span>
              </div>
              <div className={styles.movieinfo}>
                Rated: <span>{movieInfo.Rated}</span>
              </div>
              <div className={styles.movieinfo}>
                Released: <span>{movieInfo.Released}</span>
              </div>
              <div className={styles.movieinfo}>
                Runtime: <span>{movieInfo.Runtime}</span>
              </div>
              <div className={styles.movieinfo}>
                Genre: <span>{movieInfo.Genre}</span>
              </div>
              <div className={styles.movieinfo}>
                Director: <span>{movieInfo.Director}</span>
              </div>
              <div className={styles.movieinfo}>
                Actors: <span>{movieInfo.Actors}</span>
              </div>
              <div className={styles.movieinfo}>
                Plot: <span>{movieInfo.Plot}</span>
              </div>
              <Tooltip title="Add to Playlist" arrow>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenPlaylistModal}
                  className={styles.addPlaylistButton}
                >
                  Add to Playlist
                </Button>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>

      <Modal
        open={openPlaylistModal}
        onClose={handleClosePlaylistModal}
        aria-labelledby="playlist-modal-title"
        aria-describedby="playlist-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="playlist-modal-title" variant="h6" component="h2">
            Add to Playlist
          </Typography>
          <FormControl component="fieldset" style={{ marginTop: "20px" }}>
            <FormLabel component="legend">Existing Playlists</FormLabel>
            <RadioGroup
              aria-label="playlist"
              name="playlist"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              {playlists && playlists.map((playlist, index) => (
                <FormControlLabel
                  key={index}
                  value={playlist.name}
                  control={<Radio />}
                  label={playlist.name}
                />
              ))}
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </FormControl>

          <TextField
            id="new-playlist"
            label="New Playlist"
            variant="outlined"
            fullWidth
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
            style={{ marginTop: "20px" }}
          />
          <FormControl component="fieldset" style={{ marginTop: "20px" }}>
            <FormLabel component="legend">Privacy</FormLabel>
            <RadioGroup
              aria-label="privacy"
              name="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <FormControlLabel value="public" control={<Radio />} label="Public" />
              <FormControlLabel value="private" control={<Radio />} label="Private" />
            </RadioGroup>
          </FormControl>
          <div className={styles.buttonGroup}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePlaylist}
            >
              Create
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClosePlaylistModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Movie;
