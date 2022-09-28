import { useLocation } from 'react-router-dom';
import './Checkbox.css';

function Checkbox({ onCheckbox, checked, checkedSaveMovies }) {
  const location = useLocation();
  const handleCheckbox = (evt) => {
    onCheckbox(evt.target.checked);
  };

  return (
    <div className='checkbox checkbox__container'>
      <p className='checkbox__title'>Короткометражки</p>

      {location.pathname === '/movies' ? (
        <input
          type='checkbox'
          className='custom-checkbox'
          id='custom-checkbox'
          name='custom-checkbox'
          defaultValue='yes'
          checked={checked}
          onChange={handleCheckbox}
        />
      ) : (
        <input
          type='checkbox'
          className='custom-checkbox'
          id='custom-checkbox'
          name='custom-checkbox'
          defaultValue='yes'
          checked={checkedSaveMovies}
          onChange={handleCheckbox}
        />
      )}

      <label htmlFor='custom-checkbox'></label>
    </div>
  );
}

export default Checkbox;
