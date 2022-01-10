import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './style.scss';

const Calculator = () => {
  // useState
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<number>(0);

  // constants
  const signs: string[] = ['+', '-', '*', '/', '%'];
  const numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];

  // functions
  const calculate = (result: number, value: number, sign: string) => {
    console.log('result', result, 'sign', sign, 'value', value)
    switch (sign) {
      case '+':
        return result + value;
      case '-':
        return result - value;
      case '*':
        return result * value;
      case '/':
        return result / value;
      default:
        return 0;
    }
  }

  const inputEl = useRef<HTMLInputElement>(null);

  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const {value} = e.target as HTMLInputElement;
    setValue(value);
  }

  const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
    const {innerText} = e.target as HTMLElement;
    const cursorIndex = inputEl.current?.selectionStart || 0;
    setValue(prev => prev.slice(0, cursorIndex) + innerText + prev.slice(cursorIndex, prev.length));
  }

  const splitValue = (value: string) => {
    const copy = value;
    value = value.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    const numbers = copy.split(/[^0-9\.]+/);
    const operators = value.split("#").filter(function (n) {
      return n
    });
    const result = [];

    for (let i = 0; i < numbers.length; i++) {
      result.push(numbers[i]);
      if (i < operators.length) result.push(operators[i]);
    }
    return result;
  }

  useEffect(() => {
    const characters = splitValue(value);
    let res = +characters[0];
    console.log(result, +characters[0])

    for (let i = 1; i < characters.length; i += 2) {
      if (signs.includes(characters[i]) && characters[i+1]) {
        console.log(res, +characters[i+1], characters[i]);
        res = calculate(res, +characters[i+1], characters[i]);
      }
    }
    setResult(res);
    console.log(result, "result");
  }, [value])

  return (
    <div className="calculator">
      <div className="area">
        <input ref={inputEl} type="text" value={value} onChange={onChangeValue}/>
        <p>{result}</p>
      </div>
      <div className="calc-items d_flex">
        <div className="signs d_flex f_wrap">
          {signs.map((item: string, index: number) =>
            <button className="button d_flex a_items_center j_content_center"
                    onClick={onClickButton} key={index}>{item}</button>
          )}
        </div>
        <div className='numbers d_flex f_wrap'>
          {numbers.map((item: number, index: number) =>
            <button className="button d_flex a_items_center j_content_center"
                    onClick={onClickButton} key={index}>{item}</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator;