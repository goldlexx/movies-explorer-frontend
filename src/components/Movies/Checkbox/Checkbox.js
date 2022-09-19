import './Checkbox.css';

function Checkbox({ onCheckbox, checked, localCheckbox }) {
  const handleCheckbox = (evt) => {
    onCheckbox(evt.target.checked);
  };
  console.log(localCheckbox)

  return (
    <div className='checkbox checkbox__container'>
      <p className='checkbox__title'>Короткометражки</p>
      <input
        type='checkbox'
        className='custom-checkbox'
        id='custom-checkbox'
        name='custom-checkbox'
        defaultValue='yes'
        checked={checked}
        onChange={handleCheckbox}
      />
      <label htmlFor='custom-checkbox'></label>
    </div>
  );
}

export default Checkbox;
