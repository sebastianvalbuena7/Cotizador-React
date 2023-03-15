import { createContext, useState } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({ children }) => {
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    //Cotizar
    const cotizarSeguro = () => {
        // Base
        let resultado = 2000

        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        // Hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100

        // Americano 15%
        // Europeo 30%
        // Asiatico 5%
        resultado *= calcularMarca(datos.marca)

        // Basico 20%
        // Completo 50%
        resultado *= calcularPlan(datos.plan)
        resultado = resultado.toFixed(2)

        setCargando(true)

        setTimeout(() => {
            setCargando(false)
            setResultado(resultado)
        }, 2000)
    }

    return (
        <CotizadorContext.Provider value={
            {
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}>
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext