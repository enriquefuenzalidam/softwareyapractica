const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'cabeceraVideoFondo': 'linear-gradient(162deg,rgba(0,0,0,0.6) ,rgba(255,255,255,0), #636DC6)',
                'fucsiaAzulRatioFondo': 'linear-gradient(162deg, #4351C6, rgba(211, 0, 126, 0.3), rgba(0, 0, 0,0.5), rgb(18, 33, 77), #000)',
            },
            colors: {
                neutral: colors.neutral
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                Roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
                RobotoCondensed: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
                LexendDeca: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
                Oswald: ['Oswald', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    daisyui: {
        themes: [
            {
                lofi: {
                    ...require('daisyui/src/theming/themes')['lofi'],
                    primary: '#2bdcd2',
                    'primary-content': '#171717',
                    secondary: '#016968',
                    info: '#2bdcd2',
                    'info-content': '#171717',
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
