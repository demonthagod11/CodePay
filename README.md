# CodePay

CodePay is an advanced payment processor extension for Visual Studio Code. It integrates with secure payment APIs to handle payments directly from the VS Code interface. The extension uses secure cryptographic operations and interacts with a PCI HSM module for card and bank transaction handling. It supports various transaction types including ARQC, APDU, EMV, Magstripe, ACH transfers, bank online transactions, wire transfers, and ISO 8583 messages.

## Features

- Initiate payment process via the command palette.
- Enter payment details through VS Code UI.
- Process payments using secure API interactions.
- Encrypt card data using HSM token and AES-256-GCM encryption.
- Generate card numbers based on BIN codes.
- Generate bank details.
- Handle ARQC, APDU, EMV, Magstripe, ACH transfers, bank online transactions, wire transfers, and ISO 8583 messages.
- Real-time transaction monitoring.
- Verify cardholder funds balance.
- Freeze accounts in real-time.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/demonthagod11/codepay.git
   cd codepay
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Compile the extension**:
   ```sh
   npm run compile
   ```

4. **Run the extension**:
   Press `F5` in Visual Studio Code to open a new VS Code window with the extension loaded.

## Usage

1. **Open the command palette**:
   Press `Ctrl+Shift+P` in Visual Studio Code.

2. **Initiate payment**:
   Type `Initiate Payment` and select the command.

3. **Enter payment details**:
   Follow the prompts to enter the amount, currency, and card details.

4. **Process payment**:
   The extension will process the