
export default function Footer() {

    return (

        <div className="footer">
            <div>© {new Date().getFullYear()} Aircnc, Inc · <span className="fake-footer-link">Terms</span> · <span className="fake-footer-link">Sitemap</span> · <span className="fake-footer-link">Privacy</span></div>
            <div><i className="fa-solid fa-globe" />&nbsp;English (US)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ USD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-envelope" />&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-location-dot" />&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-share" /></div>
        </div>

    );
};
