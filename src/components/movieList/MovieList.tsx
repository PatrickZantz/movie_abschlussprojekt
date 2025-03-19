import React, { useContext } from 'react';
import { MainContext } from '../../context/MainProvider';

export default function MovieList() {
  const { someValue } = useContext(MainContext);

  return (
    <div>
      <p>Wert aus dem Kontext: {someValue}</p>
    </div>
  );
}
