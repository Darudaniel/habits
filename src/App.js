import React, {useEffect, useState} from 'react'
import './styles/App.css'
import { collection, getDocs, addDoc } from "firebase/firestore";
import db, { logout, signWithGoogle } from './firebase/firebaseConfig';
import SuccessButton from './components/SuccessButton';

function App() {
  const [diasRegister, setDiasRegister] = useState('nada')
  const [name, setName] = useState('')
  const [diasList,  setDiasList] = useState({})

  const userName = () => {
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name"))
      console.log(localStorage)
    } else {
      console.log('no se puedo extraer "name" del localStorage')
    }
  }

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
    let weekDays = {
      "monday": 0,
      "tuesday": 0,
      "wednesday": 0,
      "thursday": 0,
      "friday": 0,
      "saturday": 0,
      "sunday": 0
    }

    querySnapshot.forEach((doc) => {
      daysCounter = daysCounter + 1
      const day = doc.data().day
      const dayArray = day.split(" ")
      const dayName = dayArray[0] 
      switch (dayName) {
        case "Mon":
          weekDays.monday = weekDays.monday + 1
          break;
        case "Tue":
          weekDays.tuesday = weekDays.tuesday + 1
          break;
        case "Wed":
          weekDays.wednesday = weekDays.wednesday + 1
          break;
        case "Thu":
          weekDays.thursday = weekDays.thursday + 1
          break;
        case "Fri":
          weekDays.friday = weekDays.friday + 1
          break;
        case "Sat":
          weekDays.saturday = weekDays.saturday + 1
          break;
        case "Sun":
          weekDays.sunday = weekDays.sunday + 1
          break;
        default:
          console.log("El dia no es valido")
          break;
      }
    });
    setDiasRegister(daysCounter)
    setDiasList(weekDays)
  }

  const addDataToFirebase = async (documento, datos) => {
    try {
      const docRef = await addDoc(collection(db, documento), datos);
      console.log("Datos registrados en la base de datos");
    } catch (e) {
      console.error("Error agregando documento: ", e);
      alert('No tienes permisos suficientes para agregar un dia a la estadistica. Cuando actualices la pagina tu registro se borrará y apareceran las cifras reales.')
    }
  }

  const addTask =  () => {
    const today = new Date()
    const todayFormat = today.toString()
    addDataToFirebase('dias-completos', {day: todayFormat})
    getDataFromFirebase()
  }

  const testLog = () => {
    console.log(localStorage.getItem("name"))
    setName(localStorage.getItem("name"))
  }

  useEffect(() => { 
    getDataFromFirebase()
    testLog()
  }, [])

  return (
    <div className="App">
      <h1 className='title'>Habitos</h1>
      <p className='indication'>Oprime el boton los dias que hayas cumplido con todos los habitos de tu lista de habitos diarios</p>
      <SuccessButton task={addTask} text="SUCCESS" />
      <h2 className='registro'>Llevas {diasRegister} dias registrados</h2>
      <SuccessButton task={signWithGoogle} text="Log in" />
      <p>Loged users</p>
      <p>{localStorage.getItem("name")}</p>
      <SuccessButton task={testLog} text="Actualizar" />
      <SuccessButton task={logout} text="Log out" />
    </div>
  );
}

export default App;
