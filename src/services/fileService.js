import { readdir, rm } from "fs/promises";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { EOL } from "os";

export class FileService {
    loggerService;
    currentDirectoryPath;
    initDirectoryPath;

    constructor(initDir, loggerService) {
        this.currentDirectoryPath = initDir;
        this.initDirectoryPath = initDir;
        this.loggerService = loggerService;
        process.chdir(initDir);
    }

    getCurrentDirectoryPath() {
        return this.currentDirectoryPath;
    }

    goUpFromCurrentDirectory() {
        const doubleDot = '..';

        try {
            const newPath = this.currentDirectoryPath + path.sep + doubleDot;

            process.chdir(newPath);
            this.setCurrentDirectory(process.cwd());
        } catch (err) {
            this.loggerService.log(err.message);
        }
    }

    setCurrentDirectory(dirPath) {
        this.currentDirectoryPath = dirPath;
    }

    async changeDirectory(newPath) {
        try {
            process.chdir(newPath);
            this.setCurrentDirectory(process.cwd());
        } catch (err) {
            console.log(err.message);
        }
    }

    async getCurrentDirectoryFiles() {
        try {
            const files = await readdir(this.currentDirectoryPath);
            const preparedArr = files.map((file) => {
                return {
                    Name: file,
                    Type: path.extname(file) ? 'file' : 'directory'
                }
            });
            const filesArr = preparedArr
                .filter((item) => item.Type === 'file')
                .sort((item1, item2) => item1.Name.toLowerCase().replaceAll('.', '').localeCompare(item2.Name.toLowerCase().replaceAll('.', '')));
            const dirsArr = preparedArr
                .filter((item) => item.Type === 'directory')
                .sort((item1, item2) => item1.Name.toLowerCase().replaceAll('.', '').localeCompare(item2.Name.toLowerCase().replaceAll('.', '')));

            return [...dirsArr, ...filesArr];
        } catch (err) {
            this.loggerService.log(err.message);
        }

    }

    async renameFile(pathToTargetFile, newFileName) {
        try {
            if (pathToTargetFile && newFileName) {
                const normalizedPath = path.normalize(pathToTargetFile);
                const directory = path.dirname(normalizedPath);
                const newPath = `${directory}${path.sep}${newFileName}`;
                const readable = createReadStream(normalizedPath);
                const writable = createWriteStream(newPath);

                readable.pipe(writable);
                readable.destroy();

                await rm(normalizedPath)
                console.log(`The file is renamed succesfull.`);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async readFile(pathToFile) {
        try {
            const readable = createReadStream(pathToFile);
            readable.pipe(process.stdout);

            readable.on('error', (err) => {
                this.loggerService.log(err.message);
                this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
            })

            readable.on('end', () => {
                process.stdout.write(EOL);
                this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
            })
        } catch (err) {
            this.loggerService.log(err.message);
        }
    }

    async addFile(newFileName) {
        try {
            const fullNewFilePath = `${this.currentDirectoryPath}/${newFileName}`;
            const writeable = createWriteStream(fullNewFilePath);

            writeable.close();
            this.loggerService.log(`The file was added. File path is: "${fullNewFilePath}".`);
            this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
            writeable.on('error', (err) => {
                this.loggerService.log(err.message);
                this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
            })
        } catch (err) {
            this.loggerService.log(err.message);
        }
    }

    async copyFile(pathToFile, pathToNewDir) {
        try {
            const normalizedSourceFilePath = path.normalize(pathToFile);
            const fileName = path.parse(normalizedSourceFilePath).base;
            const normalizedTargetPath = path.normalize(pathToNewDir);
            const readable = createReadStream(normalizedSourceFilePath);
            const writable = createWriteStream(normalizedTargetPath + path.sep + fileName);

            readable.pipe(writable);
            readable.destroy();
            writable.destroy();
            this.loggerService.log(`The file was copied succesfull.`);
            this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
        } catch (err) {
            this.loggerService.log(err.message);
        }
    }

    async moveFile(pathToFile, pathToNewDir) {
        try {
            const normalizedSourceFilePath = path.normalize(pathToFile);
            const fileName = path.parse(normalizedSourceFilePath).base;
            const normalizedTargetPath = path.normalize(pathToNewDir);
            const readable = createReadStream(normalizedSourceFilePath);
            const writable = createWriteStream(normalizedTargetPath + path.sep + fileName);

            readable.pipe(writable);
            readable.destroy();
            writable.destroy();

            await rm(normalizedSourceFilePath);
            this.loggerService.log(`The file was moved succesfull.`);
            this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
        } catch (err) {
            this.loggerService.log(err.message);
        }
    }

    async deleteFile(pathToFile) {
        try {
            const normalizedSourceFilePath = path.normalize(pathToFile);

            await rm(normalizedSourceFilePath);
            this.loggerService.log(`The file was removed succesfull.`);
            this.loggerService.showCurrentDirectory(this.currentDirectoryPath);
        } catch (err) {
            this.loggerService.log(err.message);
        }
    }
}