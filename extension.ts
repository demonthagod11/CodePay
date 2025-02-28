import * as vscode from 'vscode';
import axios from 'axios';
import { 
    encryptCardData, 
    getHSMToken, 
    validateInput, 
    generateCardNumber, 
    validateCardNumber,
    processARQC,
    processAPDU,
    processEMV,
    processMagstripe,
    processACH,
    processBankOnline,
    processWire,
    generateBankDetails,
    processISO8583Message,
    verifyFunds,
    freezeAccount,
    monitorTransactions
} from './utils';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "codepay" is now active!');

    let disposable = vscode.commands.registerCommand('codepay.pay', async () => {
        const amount = await vscode.window.showInputBox({ prompt: 'Enter the amount to pay (in cents)', validateInput: validateInput.amount });
        if (!amount) {
            return;
        }

        const currency = await vscode.window.showInputBox({ prompt: 'Enter the currency (e.g., USD)', validateInput: validateInput.currency });
        if (!currency) {
            return;
        }

        const cardNumber = await vscode.window.showInputBox({ prompt: 'Enter your card number', validateInput: validateCardNumber });
        const expMonth = await vscode.window.showInputBox({ prompt: 'Enter your card expiry month (MM)' });
        const expYear = await vscode.window.showInputBox({ prompt: 'Enter your card expiry year (YYYY)' });
        const cvc = await vscode.window.showInputBox({ prompt: 'Enter your card CVC' });

        if (!cardNumber || !expMonth || !expYear || !cvc) {
            vscode.window.showErrorMessage('Payment details are incomplete.');
            return;
        }

        vscode.window.showInformationMessage('Initiating Payment Process...');

        try {
            const hsmToken = await getHSMToken();
            const encryptedCardData = encryptCardData(cardNumber, expMonth, expYear, cvc, hsmToken);

            await processPayment(parseInt(amount), currency, encryptedCardData);
            vscode.window.showInformationMessage('Payment Successful');
        } catch (error) {
            vscode.window.showErrorMessage(`Payment Failed: ${error.message}`);
        }
    });

    let generateCardDisposable = vscode.commands.registerCommand('codepay.generateCard', async () => {
        const bin = await vscode.window.showInputBox({ prompt: 'Enter the BIN code (e.g., 377211)' });
        if (!bin) {
            vscode.window.showErrorMessage('BIN code is required.');
            return;
        }

        try {
            const cardNumber = generateCardNumber(bin);
            vscode.window.showInformationMessage(`Generated Card Number: ${cardNumber}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate card number: ${error.message}`);
        }
    });

    let generateBankDetailsDisposable = vscode.commands.registerCommand('codepay.generateBankDetails', async () => {
        try {
            const bankDetails = generateBankDetails();
            vscode.window.showInformationMessage(`Generated Bank Details: ${JSON.stringify(bankDetails)}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate bank details: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(generateCardDisposable);
    context.subscriptions.push(generateBankDetailsDisposable);
}

export function deactivate() {}

async function processPayment(amount: number, currency: string, encryptedCardData: string): Promise<void> {
    try {
        const response = await axios.post('https://api.securepayment.com/pay', {
            amount: amount,
            currency: currency,
            cardData: encryptedCardData,
        });

        if (response.data.status !== 'success') {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}