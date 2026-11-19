tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Manual da marca Urbanlink: escala neutra quente derivada do taupe
                slate: {
                    50: '#faf8f5',
                    100: '#f1ede6',
                    200: '#e2dace',
                    300: '#cabeaa',
                    400: '#a6977d',
                    500: '#8a7b63',
                    600: '#685c49',
                    700: '#463d2f',
                    800: '#2a241b',
                    900: '#17130d',
                    950: '#0a0906'
                },
                brand: {
                    cyan: '#36a9e1',
                    orange: '#ff931e',
                    ink: '#0a0906',
                    taupe: '#8a7b63',
                    dark: '#141210',
                    cardLight: '#ffffff',
                    cardDark: '#1b1712',
                    bgLight: '#ffffff',
                    bgDark: '#0a0906',
                    borderLight: '#e2dace',
                    borderDark: '#2a241b'
                }
            },
            fontFamily: {
                brand: ['"Baloo 2"', 'Segoe UI Variable', 'Segoe UI', 'sans-serif'],
                sans: ['Segoe UI Variable', 'Segoe UI', 'Inter', 'sans-serif']
            }
        }
    }
};
