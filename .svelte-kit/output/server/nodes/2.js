import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.L6AIr7IS.js","_app/immutable/chunks/ytsv25k_.js","_app/immutable/chunks/DVEslQcv.js","_app/immutable/chunks/DIAgXGnK.js","_app/immutable/chunks/BeCA1T5S.js","_app/immutable/chunks/BUUcKC29.js","_app/immutable/chunks/B63ULy0c.js"];
export const stylesheets = ["_app/immutable/assets/2.CCpdYCyX.css"];
export const fonts = [];
