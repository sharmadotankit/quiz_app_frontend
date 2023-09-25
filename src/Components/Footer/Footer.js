import './Footer.css'

const Footer = () => {
    return (
        <div className="footerDiv">
            <div className="footer-content">
                <h2>Quiz App</h2>
                <p>@ Created By Ankit Sharma</p>
                <p>All right reserved</p>
                <p>Made in India </p>
            </div>

            <div className="footer-content">
                <h2>Our Site Link</h2>
                <p>Home</p>
                <p>About Us</p>
                <p>Contact Us</p>
            </div>

            <div className="footer-content">
                <h2>Social Media</h2>
                <p className="fa fa-facebook"></p>
                <p className="fa fa-twitter"></p>
                <p className="fa fa-linkedin"></p>
                <p className="fa fa-youtube"></p>
            </div>

        </div>
    );
}

export default Footer;