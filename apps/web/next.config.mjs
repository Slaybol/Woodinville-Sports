import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@gridiron/shared'],
  turbopack: {
    root: path.join(process.cwd(), '..', '..'),
  },
}

export default nextConfig
