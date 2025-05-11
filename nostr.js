
    import {
      generatePrivateKey,
      getPublicKey,
      getEventHash,
      signEvent,
      relayInit
    } from 'https://cdn.jsdelivr.net/npm/nostr-tools@1.17.0/+esm';
    import { bech32 } from 'https://cdn.jsdelivr.net/npm/bech32@2.0.0/+esm';

    function decodeNsec(nsec) {
      const { words } = bech32.decode(nsec);
      const data = bech32.fromWords(words);
      return data.map(b => b.toString(16).padStart(2,'0')).join('');
    }

    (async () => {
      const relay = relayInit('wss://relay.damus.io');
      await relay.connect();
      relay.on('connect', () => console.log(`Connected to ${relay.url}`));
      relay.on('error', () => console.error(`Failed to connect to ${relay.url}`));

      const sk = decodeNsec('your-nsec-key-here');
      const pk = getPublicKey(sk);
      const event = { kind:1, pubkey:pk, created_at:Math.floor(Date.now()/1000), tags:[], content:'Hello, Nostr!' };
      event.id = getEventHash(event);
      event.sig = await signEvent(event, sk);
      await relay.publish(event);
      const sub = relay.sub([{ kinds:[1], authors:[pk] }]);
      sub.on('event', e => console.log('Received event:', e));
    })();