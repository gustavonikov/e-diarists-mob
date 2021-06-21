import { useState, useMemo } from "react"
import { api } from "../services/api"
import { validationService } from '../services/validation'

interface Diarist {
    nome_completo: string;
    foto_usuario?: string;
    reputacao?: number;
    cidade: string;
}

export default function useIndex() {
    const 
        [cep, setCep] = useState(''),
        [error, setError] = useState(''),
        [searchDone, setSearchDone] = useState(false),
        [loading, setLoading] = useState(false),
        [diarists, setDiarists] = useState([] as Diarist[]),
        [remainingDiarists, setRemainingDiarists] = useState(0)

    const validCep = useMemo(() => {
        return validationService.cep(cep)
    }, [cep])

    function searchDiarists(cep: string) {
        setSearchDone(false)
        setLoading(true)
        setError('')

        api.get<{
            diaristas: Diarist[];
            quantidade_diaristas: number;
        }>(`/api/diaristas-cidade?cep=${cep.replace(/\D/g, '')}`)
            .then((res) => {
                setDiarists(res.data.diaristas)
                setRemainingDiarists(res.data.quantidade_diaristas)
                setSearchDone(true)
                setLoading(false)
            })
            .catch((error) => {
                setError('CEP não encontrado!')
                setLoading(false)
            })
            
    }

    return {
        cep, 
        setCep,
        validCep,
        searchDiarists,
        diarists,
        error,
        searchDone,
        loading,
        remainingDiarists
    }
}