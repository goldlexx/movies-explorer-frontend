import './Checkbox.css';

function Checkbox() {
  return (
    <div className='checkbox checkbox__container'>
      <p className='checkbox__title'>Короткометражки</p>
      <input
        type='checkbox'
        className='custom-checkbox'
        id='custom-checkbox'
        name='custom-checkbox'
        defaultValue='yes'
      />
      <label htmlFor='custom-checkbox'></label>
    </div>
  );
}

export default Checkbox;
