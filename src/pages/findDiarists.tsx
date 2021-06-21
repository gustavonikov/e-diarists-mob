import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { useTheme } from '@emotion/react'
import PageTitle from '../components/PageTitle'
import TextInput from '../components/TextInput/index'
import Button from '../components/Button/index'
import UserInformation from '../components/UserInformation'
import { ErrorText, FormContainer, ResponseContainer, TextContainer } from '../styles/pages/findDiarists.style'
import useIndex from '../hooks/useIndex'
import useFindDiarist from '../hooks/useFindDiarist.mobile'

export default function FindDiarists() {
    const { colors } = useTheme()

    const { 
        cep, 
        setCep,
        validCep,
        searchDiarists,
        diarists,
        error,
        searchDone,
        loading,
        remainingDiarists
    } = useIndex()

    const { automaticCep } = useFindDiarist()

    useEffect(() => {
        if (automaticCep && !cep) {
            setCep(automaticCep)
            searchDiarists(automaticCep)
        }
    }, [automaticCep])

    return (
        <ScrollView>
            <PageTitle 
                title='Conheça os profissionais'
                subtitle = 'Preencha seu endereço e veja todos os profissionais da sua localidade'
            />
           
           <FormContainer>
                <TextInputMask 
                    value={cep}
                    onChangeText={setCep}
                    type='custom' 
                    options={{ mask: '99.999-999'}} 
                    customTextInput={TextInput}
                    customTextInputProps={{
                        label: 'Digite seu CEP'
                    }}
                />
                {
                    error ? <ErrorText>{error}</ErrorText> : null
                }

                <Button 
                    mode='contained' 
                    style={{ marginTop: 32 }}
                    color={colors.accent} 
                    disabled={!validCep || loading}
                    onPress={() => searchDiarists(cep)}
                    loading={loading}
                >
                    Buscar
                </Button>
           </FormContainer>

            {searchDone 
                && ( diarists.length > 0 ?
                    (
                            <ResponseContainer>
                                {
                                    diarists.map((diarist, index) => (
                                        <UserInformation 
                                            key={index}
                                            name={diarist.nome_completo}
                                            rating={diarist.reputacao || 0}
                                            picture={diarist.foto_usuario || ''}
                                            description={diarist.cidade}
                                            darker={index % 2 === 1}
                                        />
                                    ))
                                }

                                {
                                    remainingDiarists > 0 && (
                                        <TextContainer>
                                            ... e mais {remainingDiarists}
                                            {
                                                remainingDiarists > 1 ? 
                                                ' diaristas atendem ao seu endereço'
                                                :
                                                ' diarista atende ao seu endereço'
                                            } 
                                        </TextContainer>
                                    ) 
                                }

                                <Button mode='contained' style={{ marginTop: 32 }} color={colors.accent}>
                                    Contratar um profissional
                                </Button>
                            </ResponseContainer>
                    )
                    :
                    (
                        <TextContainer>
                            Ainda não temos diarista disponível em sua região
                        </TextContainer>
                    )
                )
            }


        </ScrollView>
    )
}