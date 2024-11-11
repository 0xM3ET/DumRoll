import { createDataItemSigner, connect, result, message } from '@permaweb/aoconnect';

const PROCESS_ID = "d0iU8eBM8iF39mRDfjhXVo3anW0i8s3zCzAfAMJhEjs"

let aoInstance: any = null;
let signer: any = null;
let isInitialized = false;

async function getAOInstance() {
    try {
        if (!aoInstance || !signer) {
            signer = createDataItemSigner(window.arweaveWallet);
            aoInstance = connect(signer);
        }
        return { ao: aoInstance, signer };
    } catch (error) {
        console.error('Error getting AO instance:', error);
        throw error;
    }
}

export async function initializeAO(walletAddress: string): Promise<void> {
    try {
        if (isInitialized) {
            console.log('AO already initialized');
            return;
        }

        const { signer } = await getAOInstance();
        if (!walletAddress) {
            throw new Error('Wallet address is required for initialization.');
        }

        // Send the initialization message
        const messageOutput = await message({
            process: PROCESS_ID,
            signer,
            tags: [
                { name: 'Action', value: 'Initialize' },
                { name: 'Wallet', value: walletAddress },
            ],
            data: "Initialization message"
        });

        console.log('Initialization message sent:', messageOutput);

        // Get the result of the initialization
        const resultOutput = await result({
            message: messageOutput,
            process: PROCESS_ID,
        });

        console.log('Result output:', JSON.stringify(resultOutput, null, 2));

        if (resultOutput) {
            console.log('AO initialization successful');
            isInitialized = true;
        } else {
            throw new Error('AO initialization failed: ' + JSON.stringify(resultOutput));
        }
    } catch (error) {
        console.error('Error initializing AO:', error);
        throw error;
    }
}

export async function diceRoll(): Promise<void> {
    try {
        const { signer } = await getAOInstance();

        const messageOutput = await message({
            process: PROCESS_ID,
            signer,
            tags: [
                { name: 'Action', value: 'DiceRoll' }
            ]
        })

        const resultOutput = await result({
            message: messageOutput,
            process: PROCESS_ID,
        })


        if (resultOutput && resultOutput.Messages && resultOutput.Messages.length > 0) {
            const messageData = JSON.parse(resultOutput.Messages[0].Data);
            console.log(messageData);

            return (messageData.diceRoll);
        }


    } catch (error) {
        console.error('Error, Try again', error);
        throw error;
    }
}

// Function to move the yellow piece
export async function moveYellowPiece(): Promise<{ row: number, col: number } | void> {
    try {
        const { signer } = await getAOInstance();

        // Send message to AO process to handle the movement of yellow piece
        const messageOutput = await message({
            process: PROCESS_ID,
            signer,
            tags: [
                { name: 'Action', value: 'MoveYellowPiece' }
            ]
        });

        // Fetch the result from AO process
        const resultOutput = await result({
            message: messageOutput,
            process: PROCESS_ID,
        });

        // Check and parse the result
        if (resultOutput && resultOutput.Messages && resultOutput.Messages.length > 0) {
            const messageData = JSON.parse(resultOutput.Messages[0].Data);

            // Log messageData for debugging
            console.log('Message Data:', messageData);



            // Extract new position from the message data
            const { newPosition } = messageData;
            const { row, col } = newPosition;

            console.log(`Yellow piece moved to: Row ${row}, Col ${col}`);

            // Return the new position to update the frontend
            return { row, col };
        }
    } catch (error) {
        console.error('Error moving yellow piece:', error);
        throw error;
    }
}

export function resetAOConnection() {
    aoInstance = null;
    signer = null;
    isInitialized = false;
}


