import { useState } from 'react';

function convertHex2RGB(hex) {
  if (hex[0] === '#') {
    const symbols = hex.split('');
    symbols.shift();
    const dec = symbols.map(i => parseInt(i,16))
    if (dec.every(i => !isNaN(i))) {
      return `rgb(${dec[0]*16 + dec[1]}, ${dec[2]*16 + dec[3]}, ${dec[4]*16 + dec[5]})`;
    }
  }
}

export default function Converter() {
  const [state, setState] = useState({color:'#ffffff', input:'#ffffff', text:'rgb(255, 255, 255)'});

  const onChange = ({target}) => {
    const { value } = target;
    if (value.length > 7) return;
    if (value.length < 7) {
      setState(prevState => ({...prevState, input: value}));
      return;
    }
    const rgb = convertHex2RGB(value);
    if (rgb) {
      setState(prevState => ({color: rgb, input: value, text: rgb}));
    } else {
      setState(prevState => ({color: '#ee0000', input: value, text: 'Ошибка!'}));
    }
  }
  
  return (
    <div className='body' style={{background: state.color}}>
      <form className='hex'>
        <input name='color' value={state.input} style={{width: '64px'}} onChange={onChange}/>
      </form>
      <div className='rgb'>{state.text}</div>
    </div>
  );
}
