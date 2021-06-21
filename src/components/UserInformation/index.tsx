import React from "react"
import { View } from 'react-native'
import { Avatar } from "react-native-paper"
import { InformationContainer, RatingStyled, UserDescription, UserInformationContainer, UserName } from './styles'

export interface UserInformationProps {
    picture: string;
    name: string;
    rating: number;
    description?: string;
    darker?: boolean;
}

export default function UserInformation(props: UserInformationProps) {
    return (
        <UserInformationContainer darker={Boolean(props.darker)}>
            <Avatar.Image source={{ uri: props.picture }} />
            <InformationContainer>
                <UserName>
                    {props.name}
                </UserName>
                <RatingStyled defaultRating={props.rating} />
                <UserDescription>
                    {props.description}
                </UserDescription>
            </InformationContainer>
        </UserInformationContainer>
    )
}
