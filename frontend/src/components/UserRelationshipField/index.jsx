import './UserRelationshipField.css';

const UserRelationshipField = (props) => {

    const relationships = [
        'Comensal',
        'Restaurante'
    ];

    const manageDataForm = (e) => {
        props.updateDataValue(e.target.value);
    }

    return <div className='user-relationship-field'>
        <label>Relación Comercial</label>
        <select value={props.value} onChange={manageDataForm}>
            <option disabled defaultValue='' value=''>Selecciona tu relación comercial</option>
            {relationships.map((relationship, index) => <option key={index} value={relationship}>{relationship}</option>)}
        </select>
    </div>
}

export default UserRelationshipField;
