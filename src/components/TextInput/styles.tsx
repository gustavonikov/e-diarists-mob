import styled from '@emotion/native'
import { TextInput } from 'react-native-paper'

export const TextInputStyled = styled(TextInput)`
    margin: 0 ${({ theme }) => theme.spacing(3)};
`

TextInputStyled.defaultProps = {
    mode: 'outlined',
}
