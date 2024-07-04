import fs from 'fs';

export function readJsonData(filePath, row) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const testData = JSON.parse(rawData);
    return testData;
}