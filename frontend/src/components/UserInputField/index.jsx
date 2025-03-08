import './UserInputField.css';

const UserInputField = (props) => {

    const manageDataForm = (e) => {
        props.updateDataValue(e.target.value);
    }

    return <div className='user-input-field'>
        <label>{props.title}</label>
        <input
            placeholder={props.placeholder} 
            type={props.type} 
            required={props.required}
            value={props.value}
            onChange={manageDataForm}
        />
    </div>
}

export default UserInputField;
