const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const Playlist = require("../models/playlist");
const Joi = require("joi");

router.get("/playlist", async (req, res) => {
    try {
        const user = await User.findById(req.query.uid); // Use findById to find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const playlists = await Playlist.find({ user: user._id });
        return res.status(200).json({ playlists }); // Change status to 200
    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occurred: ${error}` }); // Correct typo
    }
});

router.post("/playlist", async (req, res) => {
    try {
        const user = await User.findById(req.body.uid); // Use findById to find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Required fields not present." });
        }
        const existingPlaylist = await Playlist.findOne({ user: user._id, name: name.trim() });
        if (existingPlaylist) {
            return res.status(400).json({ message: "A playlist with this name already exists." });
        }
        await Playlist.create({ user: user._id, puid: uuidv4(), name: name.trim(), private: false });
        return res.status(201).json({ message: "Playlist created successfully." });
    } catch (error) {
        console.error(error); // Log error
        return res.status(500).json({ message: `Oops! An error occurred: ${error}` });
    }
});

router.post("/movie", async (req, res) => {
    try {
        const user = await User.findById(req.body.uid); // Use findById to find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const { imdbID, playlistName } = req.body;
        if (!imdbID || !playlistName) {
            return res.status(400).json({ message: "Required fields not present." });
        }
        const playlist = await Playlist.findOne({ user: user._id, name: playlistName });
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }
        if (!playlist.movies.some(movie => movie.imdbID === imdbID)) {
            playlist.movies.push({ imdbID });
        } else {
            return res.status(400).json({ message: 'Movie already in playlist' });
        }
        await playlist.save();
        return res.status(201).json({ message: `Movie added to ${playlistName}` });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: `Oops! An error occurred: ${error}` });
    }
});

router.get('/movieplay/:puid', async (req, res) => {
    try {
        console.log("heelo")
        const { puid } = req.params;
        if (!puid) return res.status(400).json({ message: "Required parameters not set." });
        const playlist = await Playlist.findOne({ puid });
        if (!playlist) return res.status(404).json({ message: "Playlist not found." });
        const movies = playlist.movies;
        return res.status(200).json({ movies, allow: true });
    } catch (error) {
        return res.status(500).json({ message: `Oops! An error occured: ${error}` });
    }
  });

  

module.exports = router;