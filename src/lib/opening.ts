// src/lib/opening.ts
// The sun lives in the root layout, so moving between pages doesn't restart it. The logo
// asks for the opening here, and the home page replays the sunrise when it arrives.

let requested = false;

export function requestOpening() {
  requested = true;
}

/** True once per request. */
export function takeOpeningRequest() {
  const wasRequested = requested;
  requested = false;
  return wasRequested;
}
