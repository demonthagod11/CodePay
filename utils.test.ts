import * as assert from 'assert';
import { encryptCardData, getHSMToken, generateCardNumber, generateBankDetails, verifyFunds, freezeAccount, monitorTransactions } from '../../utils';

suite('Utils Test Suite', () => {
    test('Sample utility test', () => {
        assert.strictEqual(1, 1);
    });

    test('Encrypt Card Data', () => {
        const token = 'sample-token';
        const cardNumber = '4111111111111111';
        const expMonth = '12';
        const expYear = '25';
        const cvc = '123';

        const encryptedData = encryptCardData(cardNumber, expMonth, expYear, cvc, token);
        assert.ok(encryptedData);
    });

    test('Get HSM Token', async () => {
        const token = await getHSMToken();
        assert.ok(token);
    });

    test('Generate Card Number', () => {
        const bin = '377211';
        const cardNumber = generateCardNumber(bin);
        assert.strictEqual(cardNumber.length, 16);
        assert.ok(cardNumber.startsWith(bin));
    });

    test('Generate Bank Details', () => {
        const bankDetails = generateBankDetails();
        assert.ok(bankDetails.accountNumber);
        assert.ok(bankDetails.routingNumber);
        assert.strictEqual(bankDetails.bankName, 'CodePay Bank');
    });

    test('Verify Funds', async () => {
        const result = await verifyFunds('4111111111111111', 1000);
        assert.strictEqual(result, true);
    });

    test('Freeze Account', async () => {
        await freezeAccount('sample-account-number');
    });

    test('Monitor Transactions', async () => {
        await monitorTransactions();
    });
});