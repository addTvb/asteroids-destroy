export const formatKmDistance = (distance: string) => {
    const integer = Math.ceil(Number(distance))
    const withCommas = integer.toLocaleString('en-US')
    return `${withCommas.replaceAll(',', ' ')} км`
 }