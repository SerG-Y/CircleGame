module.exports = {
    entry: './src/app.ts',

    output: {
        filename: './dist/bundle.js'
    },

    resolve: {
        extensions: ['', '.ts']
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};