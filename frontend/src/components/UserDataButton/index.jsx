import './UserDataButton.css';

const UserDataButton = (props) => {

    const manageDataForm = (e) => {
        props.updateDataValue(e.target.value);
    }

    return <button 
                className='user-data-button' 
                value={props.value} 
                onClick={manageDataForm}
            >
                {props.value}
            </button>
}

export default UserDataButton;
