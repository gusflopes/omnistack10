import React, { useState, useEffect } from 'react';

import './styles.css';

export default function DevForm({ onSubmit }) {
  const [location, setLocation] = useState({});
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  // Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        const { latitude, longitude } = position.coords;
        setLocation({latitude, longitude});
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude: location.latitude,
      longitude: location.longitude,
    });

    setGithub_username('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input name="github_username" id="github_username" required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input name="techs" id="techs" required
          value={techs}
          onChange={e => setTechs(e.target.value)}
          
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={location.latitude}
            onChange={e => setLocation({ ...location, latitude: Number(e.target.value)})}
            required/>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={location.longitude}
            onChange={e => setLocation({ ...location, longitude: Number(e.target.value)})}
            required/>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
    );
}
