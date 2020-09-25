import React from 'react';
import NOT from '../404.png';

const EntradaPelicula = ({ datos }) => {
	return (
		<>
			<div className='card'>
				<img
					src={datos.imagen ? `https://image.tmdb.org/t/p/original/${datos.imagen}` : NOT}
					className='card-img-top'
					alt='imagen de la pelicula'
				/>
				<div className='card-body'>
					<h5 className='card-title'>
						<strong>Titulo: </strong> {datos.titulo}
					</h5>
					<p className='card-text'>
						<strong>Director: </strong> {datos.director.map((e) => (e !== '' ? e + ',' : ''))}
					</p>
					<p className='card-text'>
						<strong>Actores: </strong> {datos.personal.map((e) => e + ',')}
					</p>
					<p className='card-text'>
						<strong>Fecha: </strong> {datos.fecha}
					</p>
				</div>
			</div>
		</>
	);
};

export default EntradaPelicula;
