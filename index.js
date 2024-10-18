const express = require('express')
const movies = require('./movies.json')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: (origin, callback)=>{
    const acet_origin = [
      'http://localhost:8080',
      'http://localhost:3000',
      'http://127.0.0.1:5500',
    ]
    if (acet_origin.includes(origin || (origin))){
      return callback(null, true)
    }

    return (callback(new Error('Hay un ERROR con el cors')))
  }
}))

app.get('/', (req, res)=>{
    res.json({message:'Todo listo'})})

app.get('/movies', (req, res)=>{
    res.json(movies)
})

app.get('/movies/:id', (req,res)=>{
    const { id } = req.params

    const movie = movies.find(movie => movie.id === id)
    if(movie)return res.json(movie)
    res.status(404).json({message:'No found'})    
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Movie deleted' });
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT, ()=>{
    console.log(`Listo el puerto http://localhost:${PORT}`)
})