export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "tiktok-wrapped/_app",
	assets: new Set([".nojekyll","stats.json"]),
	mimeTypes: {".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.DLwBug4K.js",app:"_app/immutable/entry/app.zUDZi1-B.js",imports:["_app/immutable/entry/start.DLwBug4K.js","_app/immutable/chunks/Xgj1_lMy.js","_app/immutable/chunks/DVEslQcv.js","_app/immutable/chunks/DIAgXGnK.js","_app/immutable/entry/app.zUDZi1-B.js","_app/immutable/chunks/DVEslQcv.js","_app/immutable/chunks/BeCA1T5S.js","_app/immutable/chunks/ytsv25k_.js","_app/immutable/chunks/DIAgXGnK.js","_app/immutable/chunks/BUUcKC29.js","_app/immutable/chunks/B63ULy0c.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
