module.exports = {
    toStringByFormatting : async(source) => {
        const year = source.getFullYear()
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate())

        return [year, month, day].join('.')

        function leftPad(value){
            if(value >= 10){
                return value
            }
            return `0${value}`
        }
    },

    getElapsedDay : async(startDate : Date) => {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()
        const day = now.getDate()

        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const endDate = new Date(year,month,day)

        const elapsedMs = endDate.getTime() - startDate.getTime()
        const elapsedDay = elapsedMs / (1000*60*60*24)

        return elapsedDay
    }
}