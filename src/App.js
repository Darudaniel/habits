import React, {useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore";
import db from './firebase/firebaseConfig';

function App() {
  useEffect(() => {
    const obtenerDatos = async() => {
      const datos = await getDocs(collection(db, 'usuarios'));
      //para acceder a los datos del primer registro
      console.log(datos.docs[0].data())
      //para acceder a todos los datos
      datos.forEach((documento) => {
        console.log(documento.data());
      })
    }
    obtenerDatos();
  }, [])

  return (
    <div className="App">
      <h1>Hola firebase</h1>
    </div>
  );
}

export default App;
