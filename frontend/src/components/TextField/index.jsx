import './TextField.css';

const TextField = (props) => {
    return <div className='text-field'>
        <label>{props.titulo}</label>
        <input placeholder={props.placeholder} />
    </div>
}

export default TextField;