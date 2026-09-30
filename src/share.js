const pipe = async (data, transform) =>
  new Response(new Blob([data]).stream().pipeThrough(transform)).arrayBuffer();

export async function encodeContent(text) {
  const bytes = new Uint8Array(await pipe(text, new CompressionStream('deflate-raw')));
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function decodeContent(encoded) {
  const binary = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(await pipe(bytes, new DecompressionStream('deflate-raw')));
}
