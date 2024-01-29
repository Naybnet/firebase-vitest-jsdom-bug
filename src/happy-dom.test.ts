/**
 * @vitest-environment happy-dom
 */
import { test } from 'vitest';
import { doc, getDoc, setDoc, } from 'firebase/firestore';
import { getTestEnv, expectPermissionDenied } from './utils';

test('Proper behaviour with happy-dom vitest and firebase rules testing', async () => {
  const { testEnv, db } = await getTestEnv();
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'sampleDocument', 'documentId'), { id: 'sample_data' });
  });

  await expectPermissionDenied(getDoc(doc(db, 'sampleDocument', 'documentId')));
});