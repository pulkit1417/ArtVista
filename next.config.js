/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com','firebasestorage.googleapis.com']
    }
}

export default nextConfig
// next.config.js
import { ProvidePlugin } from 'webpack';

export function webpack(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
    };

    config.plugins.push(
        new ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
}