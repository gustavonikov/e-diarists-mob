import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

interface CoordinatesProps {
    latitude: number;
    longitude: number;
}

export default function useFindDiarist() {
    const [automaticCep, setAutomaticCep] = useState(''),
        [coordinates, setCoordinates] = useState<CoordinatesProps>();

        useEffect(() => {
            (
                async () => {
                    try {
                        const gps = await askPermission()
                        
                        if (gps) [
                            setCoordinates(await getCoordinates())
                        ]
                    } catch (error) {
                        
                    }
                }
            )()
        }, [])

    useEffect(() => {
        (
            async() => {
                try {
                    if (coordinates) {
                        setAutomaticCep(await getCep())
                    }
                } catch (error) {
                    
                }
            }
        )
    }, [coordinates])
    
    async function askPermission(): Promise<boolean> {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()

            return status === 'granted'
        } catch (error) {
            return false
        }
    }

    async function getCoordinates(): Promise<CoordinatesProps> {
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest
        })

        return location.coords
    }

    async function getCep(): Promise<string> {
        if (coordinates) {
            const address = await Location.reverseGeocodeAsync(coordinates)

            if (address.length > 0) {
                address[0].postalCode || ''
            }
        }

        return ''
    }

    return {
        automaticCep
    }
}
