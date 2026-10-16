// Knowledge base for the chatbot. Built on demand (not at import time) so the
// values always come from the environment that was loaded during boot —
// a module-level template literal used to freeze "undefined" whenever dotenv
// had not run yet.
const { envString } = require("../config/env");

const DEFAULT_OFFICE_ADDRESS =
  "TFC - The Future Corner, Near 300 Feet Ring Road Touch, Gadhpur, Chowk, Sarthana Jakat Naka - Kamrej Rd, Pasodara, Surat, Gujarat 395013";

const companyInfo = () => `
Company Name: Prime Softech

About Us:
We are dedicated towards building simple, effective, affordable and manageable applications. We strongly believe in supporting your business. We've brought together years of experience in web design and development, our understanding of customer behaviour & culture, and leveraged our highly efficient processes and in-house frameworks to provide cost-effective solutions.
We have worked with startups, small businesses, large organisations, big internet brands, ecommerce businesses, charitable trusts, real estate agencies, portals, and membership organisations.

Our Vision: Transforming ideas into digital reality.

Professional Services:
1. Mobile Application Development - Android, iOS, and Flutter platforms
2. UX/UI Designing - User Experience and User Interface design to improve conversion rates and user experience across platforms
3. Web Development - Modern, responsive websites and web applications with exceptional user experience across all devices
4. Digital Marketing - Profitable business strategies with clear and efficient app marketing for effective monetization

Technology Solutions:
- Android: Mobile applications designed for best business impact and success in volatile marketplace
- iOS: Complete mobility management solutions for iPhone, iPod touch, iPad and Apple TV enterprise deployments
- Website: Modern, responsive websites and web applications across all devices and browsers
- Graphic Design: Creative visual ideas and design planning

Why Choose Us:
- Experienced Team: Access to experts who uncover the best solutions for business growth
- Creative Solutions: Custom designs that are attractive, user-friendly, and deliver strong branding
- Reliable Team: A team that cares about business growth and delivers high standards
- Clear Communication: Simple, concise advice with active listening

Contact Information:
- Address: ${envString("OFFICE_ADDRESS", DEFAULT_OFFICE_ADDRESS)}
- Email: ${envString("CAREERS_EMAIL", envString("CONTACT_EMAIL", "info@primesoftechs.com"))}
- Phone: ${envString("CONTACT_MOBILE", "+91 70647 02015")}

Company Tagline: We are creative people building exceptional digital experiences.
`;

module.exports = companyInfo;
