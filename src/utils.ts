import {
  type RulesTestEnvironment,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { assertFails } from '@firebase/rules-unit-testing';
import { expect, } from 'vitest';
import { FirestoreError } from 'firebase/firestore';

export async function getTestEnv() {
  let testEnv: RulesTestEnvironment;

  try {
    testEnv = await initializeTestEnvironment({
      projectId: 'demo-test',
      firestore: { rules: readFileSync('./firestore.rules', 'utf8') },
      hub: {
        host: 'localhost',
        port: 4400,
      },
    });
  } catch (e: unknown) {
    if ((e as any).code === 'ECONNREFUSED')
      throw new Error('Emulators must be started with to perform rules unit tests');
    else throw e;
  }

  const db = testEnv.authenticatedContext('test_user_id').firestore();

  return { testEnv, db };
};

export async function expectPermissionDenied(promise: Promise<any>) {
  const error = (await assertFails(promise)) as FirestoreError;
  expect(error.code).toBe('permission-denied');
  return error;
}