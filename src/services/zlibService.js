import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

class ZlibService {
  loggerService;
  fileService;

  constructor(loggerService, fileService) {
    this.loggerService = loggerService;
    this.fileService = fileService;     
  }

  compress(pathToFile, pathToDestination) {
    try {
      const readableStream = createReadStream(pathToFile);
      const writeableStream = createWriteStream(pathToDestination);
      const brotliCompress = createBrotliCompress();

      writeableStream.on('finish', () => {
        this.loggerService.log(`Success: File ${pathToFile} compressed to ${pathToDestination}.`);
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
      });
      readableStream.on('error', (err) => this.loggerService.log(err.message));
      writeableStream.on('error', (err) => this.loggerService.log(err.message));
      readableStream.pipe(brotliCompress).pipe(writeableStream);
    } catch (err) {
      this.loggerService.log(err.message);

    }
  }

  decompress(pathToFile, pathToDestination) {
    try {
      const readableStream = createReadStream(pathToFile);
      const writeableStream = createWriteStream(pathToDestination);
      const brotliDecompress = createBrotliDecompress();

      writeableStream.on('finish', () => {
        this.loggerService.log(`Success: File ${pathToFile} decompressed to ${pathToDestination}.`);
        this.loggerService.showCurrentDirectory(this.fileService.getCurrentDirectoryPath());
      });
      readableStream.on('error', (err) => this.loggerService.log(err.message));
      writeableStream.on('error', (err) => this.loggerService.log(err.message));
      readableStream.pipe(brotliDecompress).pipe(writeableStream);
    } catch (err) {
      this.loggerService.log(err.message);
    }
  }
}

export default ZlibService;
