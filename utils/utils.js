import fs from 'fs';
import path from 'path';

export const getDataFromFile =  async (fname) => {
    const fileName = path.join("./mocks", fname);

    const data = await fs.promises.readFile(fileName, 'utf-8');
    let josnData = JSON.parse(data);
    //console.log(josnData)
    return josnData;
}

