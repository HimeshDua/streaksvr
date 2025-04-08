import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64!,
        'base64'
      ).toString('utf8')
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error: any) {
    console.error('Firebase Admin initialization error', error.stack);
  }
}
const firebaseAdminAuth = admin.auth();

export {firebaseAdminAuth, admin};
