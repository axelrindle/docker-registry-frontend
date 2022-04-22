const webpack = require('webpack')

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(
                    process.env.VERSION || '- next',
                ),
            }),
        ]
    }
}
