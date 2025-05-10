import './AboutPage.css'; // Ensure this file exists and contains the necessary styles

const AboutPage = () => {
    return (
        <div className="about-us-container">
            <h1>About Us</h1>

            <section>
                <p>
                    At Restore Loans, we make it simple and transparent for South Africans to access short-term credit when they need it most.
                    Our straightforward loan application process is designed for ease and speed.
                </p>
                <p>
                    To get started, customers choose their desired loan amount and repayment period using sliders on our homepage,
                    where the full cost of the loan is displayed in real-time. Once satisfied, they can click “Apply Now” to proceed.
                    The online application form requests essential personal information such as ID number, employment details,
                    monthly income and expenses, and banking information. Applicants receive an instant decision regarding loan qualification.
                </p>
            </section>

            <section>
                <h2>Income Verification & Loan Disbursement</h2>
                <p>
                    To verify income, customers are required to upload a recent payslip or bank statement showing personal details and earnings.
                    We provide a helpful “How to Upload” guide for support.
                </p>
                <p>
                    Once approved, the loan is paid directly into the customer’s bank account, with repayments automatically collected on the due date—so
                    it’s important that the necessary funds are available.
                </p>
            </section>

            <section>
                <h2>Commitment to Transparency</h2>
                <p>
                    Restore Loans is committed to transparency. We offer short-term loans of up to one month, with no hidden fees or extended balances.
                    The total cost, including a maximum interest rate of 5% per month, a service fee of R69 (pro-rated for the first 30 days),
                    an initiation fee, and 15% VAT, is clearly shown upfront.
                </p>
            </section>

            <section>
                <h2>Important Considerations: Repayment</h2>
                <p>
                    However, failure to repay can lead to increased costs beyond the original agreement. We may initiate collection attempts,
                    continue charging interest and fees, and involve external legal collections partners—potentially adding further costs.
                </p>
                <p>
                    Missed repayments are also reported to credit bureaus, which could negatively impact your credit record and future borrowing ability.
                </p>
            </section>

            <footer>
                <p>
                    At Restore Loans, our goal is to provide fast, fair, and transparent financial support when you need it most.
                </p>
            </footer>
        </div>
    );
};

export default AboutPage;