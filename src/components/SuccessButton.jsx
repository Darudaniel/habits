import '../styles/SuccessButton.css'

const SuccessButton = (props) => {

    const handleClick = () => {
        props.task()
    }

    return (
        <button className='success-button' type="button" onClick={handleClick} >{props.text}</button>
    )
}

export default SuccessButton