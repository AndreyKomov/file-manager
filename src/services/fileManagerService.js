export class FileManagerService {
    fileService;
    loggerService;
    osService;
    cryptoService;
    zlibService;

    constructor(filesService, loggerService, osService, cryptoService, zlibService) {
        this.fileService = filesService;
        this.loggerService = loggerService;
        this.osService = osService;
        this.cryptoService = cryptoService;
        this.zlibService = zlibService;
    }

    up() {
        this.fileService.goUpFromCurrentDirectory();
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
    }

    async cd(path) {
        await this.fileService.changeDirectory(path);
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
    }

    async ls() {
        await this.fileService.getCurrentDirectoryPathFiles();
        this.loggerService.showFiles(await this.fileService.getCurrentDirectoryPathFiles());
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
    }

    async cat(pathToFile) {
        await this.fileService.readFile(pathToFile);
    }

    async add(newFileName) {
        await this.fileService.addFile(newFileName);
    }

    async rn(pathToFile, newFileName) {
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());

        if (pathToFile && newFileName) {
            await this.fileService.renameFile(pathToFile, newFileName);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async cp(pathToFile, pathToNewDir) {
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());

        if (pathToFile && pathToNewDir) {
            await this.fileService.copyFile(pathToFile, pathToNewDir);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async mv(pathToFile, pathToNewDir) {
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());

        if (pathToFile && pathToNewDir) {
            await this.fileService.moveFile(pathToFile, pathToNewDir);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async rm(pathToFile) {
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());

        if (pathToFile) {
            await this.fileService.deleteFile(pathToFile);
        } else {
            this.loggerService.log('Operation fail: invalid arguments');
        }
    }

    async os(arg) {
        await this.osService.getOSInfo(arg);

        const currentDirectory = this.fileService.getCurrentDirectoryPath();

        this.loggerService.showCurrentDirectory(currentDirectory);
    }

    async hash(pathToFile) {
        await this.cryptoService.calculateHash(pathToFile);
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
    }

    async compress(pathToFile, pathToDestination) {
        await this.zlibService.compress(pathToFile, pathToDestination);
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
    }

    async decompress(pathToFile, pathToDestination) {
        await this.zlibService.decompress(pathToFile, pathToDestination);
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
    }
}
