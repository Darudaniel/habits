import React, {useEffect, useState} from 'react'
import './styles/App.css'
import { collection, getDocs, addDoc } from "firebase/firestore";
import db, { logout, signWithGoogle } from './firebase/firebaseConfig';
import SuccessButton from './components/SuccessButton';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'

function App() {
  ChartJS.register(...registerables);

  const [diasRegister, setDiasRegister] = useState('nada')
  const [diasList,  setDiasList] = useState({})

 
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
      await addDoc(collection(db, documento), datos);
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
  }

  const graphicData = {
    labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    datasets: [{
      label: "Hustle",
      backgroundColor: "rgb(137,226,147)" ,
      borderColor: "rgb(0, 0, 0)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(187, 255, 0, 0.336)",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      hoverBorderColor: "rgb(0, 0, 0)",
      data: [
        diasList.monday,
        diasList.tuesday,
        diasList.wednesday,
        diasList.thursday,
        diasList.friday,
        diasList.saturday,
        diasList.sunday
      ]
    }]
  }
  const graphicOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 10
                }
            }
        }
    }
  }

  useEffect(() => { 
    getDataFromFirebase()
  }, [])

  return (
    <div className="App">
      <section className="container">
        <h1 className='title'>Habits</h1>
        <Bar className='graphic' data={graphicData} options={graphicOptions} />
        <p className='indication'>Congratulations, today you fulfilled all your habits. Record this achievement by pressing the success button</p>
        <div className='button-container'>
          <SuccessButton task={addTask} text="SUCCESS" />
        </div>
        <h2 className='registro'>Llevas {diasRegister} dias registrados</h2>
        <p className='user-name'>{localStorage.getItem("name")}</p>
        <SuccessButton task={signWithGoogle} text="Log in" />
        <SuccessButton task={testLog} text="Actualizar" />
        <SuccessButton task={logout} text="Log out" />
      </section>
    </div>
  );
}

export default App;
