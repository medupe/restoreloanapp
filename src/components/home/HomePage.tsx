import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import slide1Image from '/src/assets/images/slide1.jpg';
import slide2Image from '/src/assets/images/slide2.png';
import slide3Image from '/src/assets/images/slide3.jpg';


const HomePage = () => {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [returnAmount, setReturnAmount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (amount && duration) {
            const loanAmount = parseFloat(amount);
            const days = parseInt(duration, 10);
            const months = days / 30;

            // 5% monthly interest
            const monthlyInterest = 0.05;
            const interest = loanAmount * monthlyInterest * months;

            // Initiation fee: R165 + 10% of amount over R1,000
            const initiationFee =
                165 + (loanAmount > 1000 ? 0.1 * (loanAmount - 1000) : 0);

            // Monthly service fee: R60 per month
            const monthlyServiceFee = 60 * months;

            const totalRepayment =
                loanAmount + interest + initiationFee + monthlyServiceFee;

            setReturnAmount(totalRepayment.toFixed(2));
        } else {
            setReturnAmount('');
        }
    }, [amount, duration]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log({ amount, duration, returnAmount });
        navigate('/login');
    };

    const handleSlideChange = (direction: number) => {
        const slider = document.querySelector('.slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.slide');
        const activeSlide = slider.querySelector('.slide.active');
        let index = activeSlide ? Array.from(slides).indexOf(activeSlide) : -1;

        if (index >= 0) slides[index].classList.remove('active');
        const newIndex = (index + direction + slides.length) % slides.length;
        slides[newIndex].classList.add('active');
    };

    useEffect(() => {
        const interval = setInterval(() => handleSlideChange(1), 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <div className="slider-container">
                <div className="slider">
                    <div className="slide active">
                       <img src={slide1Image} alt="Slide 1" />
                        <p>Low-interest loans tailored for you</p>
                    </div>
                    <div className="slide">
                       <img src={slide2Image} alt="Slide 3" />
                        <p>Fast and easy application process</p>
                    </div>
                    <div className="slide">
                        <img src={slide3Image} alt="Slide 3" />
                        <p>Flexible repayment options</p>
                    </div>
                </div>
                <div className="slider-controls">
                    <button onClick={() => handleSlideChange(-1)}>❮</button>
                    <button onClick={() => handleSlideChange(1)}>❯</button>
                </div>
            </div>

            <section className="loan-calculator-section">
                <h2>Quick Loan Calculator</h2>
                <form className="loan-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="amount">Loan Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (in days)</label>
                        <select
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Duration</option>
                            <option value="30"> 1 Month</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="returnAmount">Return Amount</label>
                        <input
                            type="text"
                            id="returnAmount"
                            value={returnAmount}
                            readOnly
                            placeholder="Return will be calculated"
                        />
                    </div>

                    <button type="submit">Apply for Loan</button>
                </form>
            </section>
        </div>
    );
};

export default HomePage;
