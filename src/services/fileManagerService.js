export class FileManagerService {
    fileService;
    loggerService;
    osService;
    cryptoService;
    zlibService;
    currentDirectory;

    constructor(filesService, loggerService, osService, cryptoService, zlibService) {
        this.fileService = filesService;
        this.loggerService = loggerService;
        this.osService = osService;
        this.cryptoService = cryptoService;
        this.zlibService = zlibService;
        this.currentDirectory = this.fileService.getCurrentDirectory();
    }

    up() {
        this.fileService.goUpFromCurrentDirectory();
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }

    async cd(path) {
        await this.fileService.changeDirectory(path);
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }

    async ls() {
        await this.fileService.getCurrentDirectoryFiles();
        this.loggerService.logFiles(await this.fileService.getCurrentDirectoryFiles());
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }

    async cat(pathToFile) {
        await this.fileService.readFile(pathToFile);
    }

    async add(newFileName) {
        await this.fileService.addFile(newFileName);
    }

    async rn(pathToFile, newFileName) {
        this.loggerService.showCurrentDirectory(this.currentDirectory);

        if (pathToFile && newFileName) {
            await this.fileService.renameFile(pathToFile, newFileName);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async cp(pathToFile, pathToNewDir) {
        this.loggerService.showCurrentDirectory(this.currentDirectory);

        if (pathToFile && pathToNewDir) {
            await this.fileService.copyFile(pathToFile, pathToNewDir);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async mv(pathToFile, pathToNewDir) {
        this.loggerService.showCurrentDirectory(this.currentDirectory);

        if (pathToFile && pathToNewDir) {
            await this.fileService.moveFile(pathToFile, pathToNewDir);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async rm(pathToFile) {
        this.loggerService.showCurrentDirectory(this.currentDirectory);

        if (pathToFile) {
            await this.fileService.deleteFile(pathToFile);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async os(arg) {
        await this.osService.getOSInfo(arg);
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }

    async hash(pathToFile) {
        await this.cryptoService.calculateHash(pathToFile);
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }

    async compress(pathToFile, pathToDestination) {
        await this.zlibService.compress(pathToFile, pathToDestination);
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }

    async decompress(pathToFile, pathToDestination) {
        await this.zlibService.decompress(pathToFile, pathToDestination);
        this.loggerService.showCurrentDirectory(this.currentDirectory);
    }
}
