import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<string>('');
    const [returnAmount, setReturnAmount] = useState<string>('');
    const navigate = useNavigate();

    const handleApplyClick = (e: FormEvent) => {
        e.preventDefault();
        console.log('Applying for loan with:', { selectedAmount, selectedDuration, returnAmount });
        navigate('/apply');
    };

    const handleSlideChange = (direction: number) => {
        const slider = document.querySelector('.slider') as HTMLElement;
        if (!slider) return;

        const slides = slider.querySelectorAll('.slide');
        const currentSlide = slider.querySelector('.slide.active') as HTMLElement;
        let currentIndex = Array.from(slides).indexOf(currentSlide);

        if (currentIndex === -1) {
            currentIndex = 0;
        }

        if (currentSlide) {
            currentSlide.classList.remove('active');
        }

        const newIndex = (currentIndex + direction + slides.length) % slides.length;
        slides[newIndex].classList.add('active');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleSlideChange(1); // Move to the next slide
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        if (selectedAmount && selectedDuration) {
            const amount = parseFloat(selectedAmount);
            const duration = parseInt(selectedDuration, 10);
            const calculatedReturnAmount = (amount * 0.1 * duration).toFixed(2);
            setReturnAmount(calculatedReturnAmount);
        } else {
            setReturnAmount('');
        }
    }, [selectedAmount, selectedDuration]);

    return (
        <div className="home-container">
            <div className="slider-container">
                <div className="slider">
                    <div className="slide active">
                        <img src="src/assets/images/slide1.jpg" alt="Slide 1" />
                        <p>Low-interest loans tailored for you</p>
                    </div>
                    <div className="slide">
                        <img src="src/assets/images/slide2.png" alt="Slide 2" />
                        <p>Fast and easy application process</p>
                    </div>
                    <div className="slide">
                        <img src="src/assets/images/slide3.jpg" alt="Slide 3" />
                        <p>Flexible repayment options</p>
                    </div>
                </div>
                <div className="slider-controls">
                    <button className="prev-slide" aria-label="Previous Slide" onClick={() => handleSlideChange(-1)}>❮</button>
                    <button className="next-slide" aria-label="Next Slide" onClick={() => handleSlideChange(1)}>❯</button>
                </div>
            </div>

            <br/>
            <h3>Building a Brighter financial Future & Good Support</h3>
            <p>Find the best loan option for your needs.</p>

            <div className="loan-calculator-section">
                <h2>Quick Loan Calculator / Application</h2>
                <form onSubmit={handleApplyClick} className="search-box">
                    <div className="select-form">
                        <div className="input-itms">
                            <label htmlFor="customAmount" className="sr-only">Enter Amount</label>
                            <input
                                type="number"
                                id="customAmount"
                                placeholder="Enter Amount"
                                value={selectedAmount}
                                onChange={(e) => setSelectedAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="select-form">
                        <div className="select-itms">
                            <label htmlFor="selectDuration" className="sr-only">Duration Month</label>
                            <select
                                name="selectDuration"
                                id="selectDuration"
                                value={selectedDuration}
                                onChange={(e) => setSelectedDuration(e.target.value)}
                            >
                                <option value="" disabled>Duration Month</option>
                                <option value="7">1 Week</option>
                                <option value="14">2 Weeks</option>
                                <option value="21">3 Weeks</option>
                                <option value="30">4 Weeks</option>
                                
                            </select>
                        </div>
                    </div>
                    <div className="input-form">
                        <label htmlFor="returnAmount" className="sr-only">Return Amount</label>
                        <input
                            type="text"
                            id="returnAmount"
                            placeholder="Return Amount"
                            value={returnAmount}
                            readOnly
                        />
                    </div>
                    <div className="search-form">
                        <button type="submit">Apply for Loan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomePage;