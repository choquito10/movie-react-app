import React, { useEffect, useState } from 'react';
import EntradaPelicula from './EntradaPelicula';

const Generos = ({ datos }) => {
	const [generos, setGeneros] = useState([]);
	const [generosBusqueda, setGenerosBusqueda] = useState([]);

	useEffect(() => {
		traerGeneros();
		async function traerGeneros() {
			const resultado = await fetch(
				'https://api.themoviedb.org/3/genre/movie/list?api_key=314dd2fd158d1a156815bfda6f2037c3&language=en-US'
			);
			const data = await resultado.json();
			setGeneros(data.genres);
		}
	}, []);

	useEffect(() => {
		let GenerosDeLaBusqueda = [];
		for (let z = 0; z < datos.length; z++) {
			for (let q = 0; q < datos[z].genero.length; q++) {
				for (let g = 0; g < generos.length; g++) {
					if (datos[z].genero[q] === generos[g].id) {
						GenerosDeLaBusqueda.push(generos[g]);
					}
				}
			}
		}
		let QuitarRepetidos = [...new Set(GenerosDeLaBusqueda)];
		setGenerosBusqueda(QuitarRepetidos);
	}, [datos, generos]);

	return (
		<>
			{generosBusqueda.length > 0
				? generosBusqueda.map((genero) => {
						return (
							<div key={genero.id} className='contenedor-generos'>
								<h3>{genero.name}</h3>
								{datos.map((pelicula) =>
									pelicula.genero.map((numero) =>
										numero === genero.id ? <EntradaPelicula key={pelicula.genero.numero} datos={pelicula} /> : ''
									)
								)}
							</div>
						);
				  })
				: ''}
		</>
	);
};

export default Generos;
