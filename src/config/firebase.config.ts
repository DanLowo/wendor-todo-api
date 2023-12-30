import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from "path";


const app = admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname, "wendor-dc3ab-firebase-adminsdk-kr3ye-4294c190b7.json")),
    storageBucket: "gs://wendor-dc3ab.appspot.com"
})

const bucket = admin.storage(app).bucket()
const file = bucket.file("database.sqlite")

export const handleDownloadDBFromFirebase = () => {
    return new Promise<string>((resolve) => {
        file.createReadStream()
            .pipe(fs.createWriteStream(path.resolve(__dirname, "../../db_from_firebase.sqlite")))
            .on('finish', () => {
                resolve("Done")
                console.log('Database file downloaded successfully!');
            });
    })
}


export const handleUploadLocalFileToFirebase = async () => {
    const bucket = admin.storage(app).bucket();
    const file = bucket.file("database.sqlite");

    return new Promise<void>((resolve, reject) => {
        const readStream = fs.createReadStream(path.resolve(__dirname, "../../db_from_firebase.sqlite"));
        const writeStream = file.createWriteStream({
            metadata: {
                contentType: 'application/x-sqlite3',
            },
        });

        readStream.on('error', (error) => {
            reject(error);
        });

        writeStream.on('error', (error) => {
            reject(error);
        });

        writeStream.on('finish', () => {
            console.log('Local copy uploaded to Firebase successfully!');
            resolve();
        });

        readStream.pipe(writeStream);
    });
}

