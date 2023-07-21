'use client';
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
    },
});
export default function ThemeProviderWrapper({ children }: { children: React.ReactNode; }) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider >;
}