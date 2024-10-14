import CryptoService from "./services/cryptoService.js";
import { FileManagerService } from "./services/fileManagerService.js";
import { FileService } from "./services/fileService.js";
import { LoggerService } from "./services/loggerService.js";
import OsService from "./services/osService.js";
import ZlibService from "./services/zlibService.js";
import { getUserName } from "./utils/getUserName.js";
import { homedir } from 'os';

const initManager = async () => {
    // console.log('File manager is started.');

    const loggerService = new LoggerService(getUserName());
    const homeDir = homedir();
    const fileService = new FileService(homeDir, loggerService);
    const osService = new OsService(loggerService);
    const cryptoService = new CryptoService(loggerService, fileService);
    const zlibService = new ZlibService(loggerService, fileService);
    const fileManagerService = new FileManagerService(
        fileService,
        loggerService,
        osService,
        cryptoService,
        zlibService
    );

    process.stdin.on('data', (async (chunk) => {
        const inputData = chunk.toString().replace(/^\s+|\s+$/g, '');
        const inputArray = inputData.split(' ');
        // console.log(inputData.split(' '));

        // const inputArray = chunk.toString();

        const command = inputArray[0]
        const arg1 = inputArray[1]
        const arg2 = inputArray[2]

        switch (command) {
            case 'up':
                fileManagerService.up();
                break;

            case 'cd':
                await fileManagerService.cd(arg1);
                break;

            case 'ls':
                await fileManagerService.ls();
                break;

            case 'cat':
                await fileManagerService.cat(arg1);
                break;

            case 'add':
                await fileManagerService.add(arg1);
                break;

            case 'rn':
                await fileManagerService.rn(arg1, arg2);
                break;

            case 'cp':
                await fileManagerService.cp(arg1, arg2);
                break;

            case 'mv':
                await fileManagerService.mv(arg1, arg2);
                break;

            case 'rm':
                await fileManagerService.rm(arg1);
                break;

            case 'os':
                await fileManagerService.os(arg1);
                break;

            case 'hash':
                await fileManagerService.hash(arg1);
                break;

            case 'compress':
                await fileManagerService.compress(arg1, arg2);
                break;

            case 'decompress':
                await fileManagerService.decompress(arg1, arg2);
                break;

            /*           case 'SIGINT':
                        loggerService.showByeMessage();
                        process.exit();
                        break; */

            case '.exit':
                loggerService.showByeMessage();
                process.exit();
                break;

            default:
                loggerService.log('Invalid input: unknown operation.');
        }
    }))

    process.on('SIGINT', () => {
        loggerService.showByeMessage();
        process.exit(0);
    });

    loggerService.gretting();
    loggerService.showCurrentDirectory(homeDir);
}

await initManager();
