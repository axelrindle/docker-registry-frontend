module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            margin: ['last'],
            colors: {
                docker: '#2496ED'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
