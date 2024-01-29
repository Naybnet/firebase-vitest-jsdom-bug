# firebase-vitest-jsdom-bug

Starting with vitest v0.34.3, using jsdom in vitest in conjunction with firestore-rules-testing fails with the following error :

```
@firebase/firestore: Firestore (10.7.2): FIRESTORE (10.7.2) INTERNAL ASSERTION FAILED: Unexpected state
 ❯ fail node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/util/assert.ts:40:9
 ❯ hardAssert node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/util/assert.ts:54:5
 ❯ fromBytes node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/remote/serializer.ts:264:5
 ❯ fromWatchChange node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/remote/serializer.ts:507:25
 ❯ PersistentListenStream.onMessage node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/remote/persistent_stream.ts:642:25
 ❯ node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/remote/persistent_stream.ts:517:21
 ❯ node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/remote/persistent_stream.ts:570:18
 ❯ node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/util/async_queue_impl.ts:135:7
 ❯ node_modules/.pnpm/@firebase+firestore@4.4.1_@firebase+app@0.9.26/node_modules/@firebase/firestore/src/util/async_queue_impl.ts:186:14
 ❯ processTicksAndRejections node:internal/process/task_queues:95:5
```

No problem occurs when happy-dom instead of jsdom.

The commit causing the error seems to be the following : https://github.com/vitest-dev/vitest/commit/b42cf36e#diff-af862ead1f0516f5c67aa19607c6baffe9c85cc2368b762d975a280503cd0d2b.

A similar issue was filed a few years ago with jest : https://github.com/firebase/firebase-js-sdk/issues/3096

## To reproduce the bug

```sh
pnpm install
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

Start the firestore emulators

```sh
docker compose up -d
```

Bug with jsdom

```sh
pnpm test:unit jsdom
```

Correct behaviour with happy-dom

```sh
pnpm test:unit happy-dom
```
