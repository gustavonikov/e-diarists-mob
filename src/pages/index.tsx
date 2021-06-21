import React from 'react'
import { View, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Button from '../components/Button/index'
import { RootStackParamsList } from '../Router'

type NavigationProps = StackNavigationProp<RootStackParamsList, 'Index'>

interface IndexProps {
    navigation: NavigationProps;
}

export default function Index({ navigation }: IndexProps) {
    return (
        <View style={{ flex: 1 , justifyContent: 'center' }}>
            <Button mode='contained' onPress={() => navigation.navigate('FindDiarists')}>
                Encontrar Diarista
            </Button>
        </View>
    )
}
