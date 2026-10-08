// Locks the members-area link behind the shared password.
//
//   TRS_PASSWORD="new password" TRS_DRIVE_URL="https://drive.google.com/..." node tools/encrypt-members.mjs
//
// Writes tools/members.enc.json. Only the encrypted link is stored in the repo,
// never the password or the plain link. Then run `node tools/build.mjs`.
//
// How it works: the password is stretched with PBKDF2 (SHA-256, 600k rounds) into an
// AES-GCM key that encrypts the link. The browser repeats the same steps on whatever the
// visitor types; a wrong password fails to decrypt, a right one yields the link.
//
// Honest limit: this is a static site, so anyone can download the encrypted blob and try
// passwords offline. A long, random password makes that impractical; a short word does not.
// For genuinely sensitive files, restrict the Drive folder itself to named accounts.

import { webcrypto as crypto } from "node:crypto";
import { writeFileSync } from "node:fs";

const password = process.env.TRS_PASSWORD;
const url = process.env.TRS_DRIVE_URL;
if (!password || !url) {
  console.error("Set TRS_PASSWORD and TRS_DRIVE_URL.");
  process.exit(1);
}

const ITERATIONS = 600000;
const enc = new TextEncoder();
const b64 = (buf) => Buffer.from(buf).toString("base64");

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
  baseKey,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"]
);
const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(url));

writeFileSync(
  new URL("./members.enc.json", import.meta.url),
  JSON.stringify({ v: 1, iter: ITERATIONS, salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)) }, null, 2) + "\n"
);
console.log("Wrote tools/members.enc.json");
