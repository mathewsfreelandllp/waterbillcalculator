# Testing Guide

## Quick Start

### Test the Calculator Manually

1. **Start a local server:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Open in browser:**
   - Navigate to `http://localhost:8000`
   - Enter `10000` gallons
   - Select `5/8"` meter
   - Click "Calculate Bill"

3. **Expected Results:**
   - Year 1: $42.50
   - Year 2: $44.65
   - Year 3: $46.89

### Run Automated Tests

1. **Start a local server:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Open test suite:**
   - Navigate to `http://localhost:8000/test.html`
   - All 16 tests should pass automatically

## Test Coverage

The automated test suite validates:

- ✅ **Fixed Charges**: All meter sizes (5/8", 3/4", 1") across all 3 years
- ✅ **Zero Usage**: Ensures bill equals fixed charge only
- ✅ **Single Tier**: Usage within first tier (0-5,000 gallons)
- ✅ **Multiple Tiers**: Usage spanning 2 or more tiers
- ✅ **All Four Tiers**: Large usage hitting all progressive tiers
- ✅ **Edge Cases**: Exact tier boundaries (5,000, 10,000, 20,000 gallons)
- ✅ **Rate Progression**: Year 2 > Year 1, Year 3 > Year 2
- ✅ **Meter Sizing**: Larger meters have higher fixed charges
- ✅ **Calculation Accuracy**: Breakdown components sum correctly

## Example Test Cases

| Test Case | Gallons | Meter | Year 1  | Year 2  | Year 3  |
|-----------|---------|-------|---------|---------|---------|
| Minimum   | 0       | 5/8"  | $15.00  | $15.75  | $16.54  |
| Low       | 3,000   | 5/8"  | $22.50  | $23.63  | $24.81  |
| Medium    | 10,000  | 5/8"  | $42.50  | $44.65  | $46.89  |
| High      | 25,000  | 1"    | $120.00 | $126.08 | $132.34 |
| Very High | 50,000  | 1"    | $220.00 | $231.08 | $242.59 |

## Troubleshooting

### Tests Don't Load
- Ensure server is running: `python3 -m http.server 8000`
- Check browser console for JavaScript errors
- Try refreshing the page

### Calculations Don't Match
- Verify meter size is selected correctly
- Check that gallons is a positive number
- Review the calculation breakdown for details

## Need Help?

Refer to the main [README.md](README.md) for complete documentation.
