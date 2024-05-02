/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com','firebasestorage.googleapis.com']
    }
}

export default nextConfig

import nextTranspileModules from 'next-transpile-modules';

export function webpack(config, { isServer }) {
    if (!isServer) {
        config.resolve.fallback.buffer = require.resolve('buffer/');
        config.resolve.fallback.stream = require.resolve('stream-browserify');
    }

    return nextTranspileModules(['node-fetch', 'encoding'])(config);
}