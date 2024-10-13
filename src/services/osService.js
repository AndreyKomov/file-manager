import { EOL, cpus, homedir, userInfo, arch } from 'os'

export class OsService {
  loggerService;

  constructor(loggerService) {
    this.loggerService = loggerService;
  }

  getOSInfo(arg) {
    this.isArg(arg);

    switch (arg) {
      case '--EOL':
        this.loggerService.log(JSON.stringify(EOL).replaceAll('"', ''))
        break;

      case '--cpus':
        const coreCPUS = cpus();
        const data = coreCPUS.map(it => it.model);

        const cpusObj = {
          amount: coreCPUS.length,
          data: data
        };

        this.loggerService.log(cpusObj);
        break;

      case '--homedir':
        const homeDir = homedir();
        this.loggerService.log(`Homedir: ${homeDir}`);
        break;

      case '--username':
        const {username: userName} = userInfo();
        this.loggerService.log(`Username: ${userName}`);
        break;

      case '--architecture':
        const architecture = arch();
        this.loggerService.log(`CPU architecture: ${architecture}`);
        break;
      default :
        this.loggerService.log('Operation failed: unknown argument');
    }
  }

  isArg(arg) {
    if (!arg) {
        this.loggerService.log('No argument provided');
      }
  }
}

export default OsService