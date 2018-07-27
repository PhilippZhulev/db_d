import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

///sssssss

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#62727b',
            main: '#2f4050',
            dark: '#102027'
        },
        secondary: {
            light: '#6effe8',
            main: '#1ab394',
            dark: '#00b686',  
        },
    },
});

//Запускаем рендер React
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('APP_panel1')
);

console.log("Change: React run....");

//Запускаем рендер React
// >>>>>>> origin/Zhulev_Philipp
// document.addEventListener("React.run", function() {
//     ReactDOM.render(
//         <MuiThemeProvider theme={theme}>
//             <App />
//         </MuiThemeProvider>,
//         document.getElementById('APP_panel1')
//     );
//
//     console.log("Change: React run....");
// });
