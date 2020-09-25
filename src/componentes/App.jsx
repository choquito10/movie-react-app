import React, { useState } from 'react';
import Generos from './Generos';

const App = () => {
	const [datosPelicula, setDatosPelicula] = useState([]);

	const BusquedaPelicula = async ({ target }) => {
		if (target.value.length === 0) return setDatosPelicula([]);
		try {
			const data = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=314dd2fd158d1a156815bfda6f2037c3&page=1&query=${target.value}`
			);
			const { results } = await data.json();
			const actor = await fetch(
				`https://api.themoviedb.org/3/movie/${results[0].id}?api_key=314dd2fd158d1a156815bfda6f2037c3&append_to_response=credits`
			);
			const { credits } = await actor.json();
			const director = credits.crew.map((e) => (e.job === 'Director' ? e.name : ''));
			const personal = credits.cast.map((e, indice) => (e.character && indice < 3 ? e.name : ''));

			const objetoConDatos = {
				id: results[0].id,
				titulo: results[0].original_title,
				fecha: results[0].release_date,
				imagen: results[0].poster_path,
				genero: results[0].genre_ids,
				director,
				personal: [personal[0], personal[1], personal[2]],
			};

			actualizar(objetoConDatos);
		} catch (error) {
			setDatosPelicula([]);
		}
	};

	const actualizar = (obj) => {
		const nuevo = [];
		nuevo.push(obj);
		const filtrado = [...new Set(nuevo)];
		setDatosPelicula(filtrado);
	};

	// por arreglar el key prop de generos

	return (
		<>
			<input type='text' className='form-control' placeholder='Buscador' onChange={(ev) => BusquedaPelicula(ev)} />
			<div className='cuadro-resultados'>{datosPelicula.length > 0 ? <Generos datos={datosPelicula} /> : ''}</div>
		</>
	);
};

export default App;
