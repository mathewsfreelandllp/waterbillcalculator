# Water Bill Calculator

A web-based residential water service rate calculation tool that helps clients estimate their monthly water bills for the next 3 years.

## Features

- **Simple Input Form**: Enter your monthly water usage in gallons and select your meter size
- **3-Year Projections**: Get instant calculations for Year 1, Year 2, and Year 3
- **Tiered Rate Structure**: Automatically calculates based on progressive water usage tiers
- **Detailed Breakdowns**: View itemized calculations showing fixed charges and usage charges per tier
- **Rate Information**: Access complete rate sheets with expandable details
- **Mobile Responsive**: Fully optimized for mobile devices and tablets
- **User-Friendly Interface**: Clean, intuitive design with smooth interactions

## Meter Sizes Supported

- 5/8"
- 3/4"
- 1"

## Usage Rate Tiers

1. 0 - 5,000 gallons
2. 5,001 - 10,000 gallons
3. 10,001 - 20,000 gallons
4. 20,001+ gallons

## How to Use

1. Enter your monthly water usage in gallons
2. Select your meter size from the dropdown
3. Click "Calculate Bill"
4. View your estimated monthly bills for all 3 years
5. Click "View Details" on any year to see the calculation breakdown

## Example

For a client using 10,000 gallons per month with a 5/8" meter:
- **Year 1**: $42.50
- **Year 2**: $44.65
- **Year 3**: $46.89

## Deployment

This tool is deployed on GitHub Pages and accessible to clients via web browser.

### Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Or serve with a local web server:
   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

## Technologies Used

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+)
- GitHub Pages for deployment

## License

© 2026 Water Service Rate Calculator