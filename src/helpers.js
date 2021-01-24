import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createTempDirectoryIfNotExists = () => {
  const tempPath = path.join(__dirname, '..', 'temp');
  const isDirExists = fs.existsSync(tempPath);

  if (!isDirExists) {
    fs.mkdirSync(tempPath, { recursive: true });
  }
};