import { LoggerService } from "./services/loggerService.js";
import { getUserName } from "./utils/getUserName.js";

const initManager = async () => {
    console.log('File manager is started.');

    const loggerService = new LoggerService(getUserName());
    
    loggerService.gretting();
    loggerService.showByeMessage();
}

await initManager();
