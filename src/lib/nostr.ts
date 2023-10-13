//import { EventEmitter } from "events";
import type { NDKEvent } from '@nostr-dev-kit/ndk';
import { nostrNotes, posts, profiles } from '$lib/stores/store'

//const emitter = new EventEmitter();

async function processEvent(event: NDKEvent): Promise<void> {
    try { event.content = JSON.parse(event.content); } catch (e) { /* empty */ }
    
    if (event.kind === 2) {
        console.log(`got post ${event.id}`);
    } else if (event.kind === 120) {
        posts.update((posts) => {
            if (!posts.find((p) => p.id === event.id)) {
                posts.unshift(event)
                //this.reqProfile(event.pubkey);
            }
            // console.log(`there are posts: ${posts.length}`);
            return posts;
        })
    /*} else if (event.kind === 0) {
        console.log(`got profile ${event.pubkey}`);
        profiles.update((profiles) => {
            profiles[event.pubkey] = {
                ...profiles[event.pubkey],
                ...event.content
            };
            console.log(`there are profiles: ${Object.values(profiles).length}`);
            return profiles;
        })*/
    }

    /*
    nostrNotes.update((notes) => {
        notes[event.id] = event;
        // console.log(`there are notes: ${Object.values(notes).length}`);
        return notes;
    });

    // annotate events this event references
    for (let tag of event.tags) {
        const [ type, eventId ] = tag;
        if (type === 'e') {
            nostrNotes.update((notes) => {
                notes.responses[eventId] = notes.responses[eventId] || [];

                // don't add duplicate responses
                if (!notes.responses[eventId].includes(event.id)) {
                    notes.responses[eventId].push(event.id);
                }

                // sort responses by timestamp
                notes.responses[eventId].sort((a, b) => {
                    return notes[a].created_at - notes[b].created_at;
                }).reverse();

                return notes;
            });
        }
    }
    */
}

//export { emitter, processEvent };
export { processEvent };