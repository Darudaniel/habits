import React, {useEffect, useState} from 'react'
import './styles/App.css'
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from './firebase/firebaseConfig';
import SuccessButton from './components/SuccessButton';

function App() {
  const [diasRegister, setDiasRegister] = useState('nada')
  //EXPLICACION
  // useEffect(() => {
  //   const obtenerDatos = async() => {
  //     const datos = await getDocs(collection(db, 'usuarios'));
  //     //para acceder a los datos del primer registro
  //     console.log(datos.docs[0].data())
  //     //para acceder a todos los datos
  //     datos.forEach((documento) => {
  //       console.log(documento.data());
  //     })
  //   }
  //   obtenerDatos();
  // }, [])

  const getDataFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "dias-completos"));
    let daysCounter = 0
    querySnapshot.forEach((doc) => {
      daysCounter = daysCounter + 1
    });
    setDiasRegister(daysCounter)
  }

  const addDataToFirebase = async (documento, datos) => {
    try {
      const docRef = await addDoc(collection(db, documento), datos);
      console.log("Datos registrados en la base de datos");
    } catch (e) {
      console.error("Error agregando documento: ", e);
    }
  }

  const addTask =  () => {
    const today = new Date()
    const todayFormat = today.toString()
    addDataToFirebase('dias-completos', {day: todayFormat})
    getDataFromFirebase()
  }

  useEffect(() => { 
    getDataFromFirebase()
  }, [])

  return (
    <div className="App">
      <h1 className='title'>Habitos</h1>
      <p className='indication'>Oprime el boton los dias que hayas cumplido con todos los habitos de tu lista de habitos diarios</p>
      <SuccessButton task={addTask} />
      <h2 className='registro'>Llevas {diasRegister} dias registrados</h2>
    </div>
  );
}

export default App;
