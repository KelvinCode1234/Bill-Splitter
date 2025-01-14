import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './Page.css';

const Page = () => {
  const [bill, setBill] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [customTip, setCustomTip] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [eachPersonBill, setEachPersonBill] = useState(0);

  const handleGenerateBill = () => {
    const tip = customTip ? parseFloat(customTip) : parseFloat(tipPercentage);
    const tipAmt = (bill * tip) / 100;
    const totalAmt = parseFloat(bill) + tipAmt;
    const eachPerson = totalAmt / numberOfPeople;

    setTipAmount(tipAmt.toFixed(2));
    setTotal(totalAmt.toFixed(2));
    setEachPersonBill(eachPerson.toFixed(2));
  };

  const handleReset = () => {
    setBill('');
    setTipPercentage('');
    setCustomTip('');
    setNumberOfPeople('');
    setTipAmount(0);
    setTotal(0);
    setEachPersonBill(0);
  };

  const notify = () => toast("Please fill in all required fields!"); 

  const handleButtonClick = () => {
    if (!bill || !numberOfPeople || (!customTip && !tipPercentage)) {
      notify();
      return;
    }

    handleGenerateBill();

  };
  

  return (
    <div className="app">
      <h1 className="title">Bill <span className="splitter">Splitter</span></h1>
      <p className="text">Easily split your bills with friends</p>
      <div className="container">
        <div className="input-section">
          <label>Bill</label>
          <input
            type="number"
            value={bill}
            placeholder='Bill Amount'
            onChange={(e) => setBill(e.target.value)}
            required
          />
          <label>Select Tip</label>
          <div className="tip-buttons">
            {[5, 10, 15, 25, 50, 75].map((tip) => (
              <button
                key={tip}
                onClick={() => setTipPercentage(tip)}
                className={tipPercentage === tip ? 'active' : ''}
              >
                {tip}%
              </button>
            ))}
          </div>
          <label className="tip">Custom Tip in Percentage</label>
          <input
            type="number"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            required
          />
          <label>Number of People</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          />
          <button onClick={handleButtonClick} className="btn-2">Generate Bill</button>
          <ToastContainer />
        </div>
          <div className="output-section">
            <p>Tip amount : {tipAmount}</p>
            <p>Total : {total}</p>
            <p>Each Person Bill : {eachPersonBill}</p>
            <button onClick={handleReset} className="btn-2">Reset</button>
          </div>
      </div>
      <footer>
        Made by <a href="https://github.com/KelvinCode1234/">KelvinCode1234</a> with <span role="img" aria-label="heart" className="animated pulse">❤️</span>
      </footer>
    </div>
  );
}

export default Page;
