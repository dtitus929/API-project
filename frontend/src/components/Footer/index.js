
export default function Footer() {

    return (

        <div className="footer-holder">
            <div className="footer">
                <div>© {new Date().getFullYear()} Aircnc, Inc · <span className="fake-footer-link">Terms</span> · <span className="fake-footer-link">Sitemap</span> · <span className="fake-footer-link">Privacy</span></div>


                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>

                    <div style={{ marginBottom: '2px' }}>
                        <span>Dave Titus:&nbsp;</span>
                    </div>

                    <div className="footer-link">
                        <span>
                            <a className="footer-button" href="http://creativegozone.com/" target="_blank" rel="noreferrer">
                                <button className="copyright-button">
                                    <i className="fas fa-eye" style={{ fontSize: '14px' }}></i>
                                </button>
                            </a>
                        </span>
                    </div>

                    <div className="footer-link">
                        <span>
                            <a className="footer-button" href="https://github.com/dtitus929/AirCnC" target="_blank" rel="noreferrer">
                                <button className="copyright-button">
                                    <i className="fa fa-github" style={{ fontSize: '14px' }}></i>
                                </button>
                            </a>
                        </span>
                    </div>

                    <div className="footer-link">
                        <span>
                            <a className="footer-button" href="https://www.linkedin.com/in/djtitus/" target="_blank" rel="noreferrer">
                                <button className="copyright-button">
                                    <i className="fa fa-linkedin-square" style={{ fontSize: '14px' }}></i>
                                </button>
                            </a>
                        </span>
                    </div>

                </div >

                {/* <div><i className="fa-solid fa-globe" />&nbsp;English (US)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ USD</div> */}

            </div>
        </div>

    );
};
