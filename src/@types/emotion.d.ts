import AppTheme from '../styles/themes/app-theme'

type PaperThemeType = typeof AppTheme

declare module '@emotion/react'{
    export interface Theme extends PaperThemeType{}
}
