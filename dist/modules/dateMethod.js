var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    toStringByFormatting: (source) => __awaiter(this, void 0, void 0, function* () {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
        return [year, month, day].join('.');
        function leftPad(value) {
            if (value >= 10) {
                return value;
            }
            return `0${value}`;
        }
    }),
    toKoreanByFormatting: (source) => __awaiter(this, void 0, void 0, function* () {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
        return year + "년 " + month + "월 " + day + "일";
        function leftPad(value) {
            if (value >= 10) {
                return value;
            }
            return `0${value}`;
        }
    }),
    getElapsedDay: (startDate) => __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endDate = new Date(year, month, day);
        const elapsedMs = endDate.getTime() - startDate.getTime();
        const elapsedDay = elapsedMs / (1000 * 60 * 60 * 24);
        return elapsedDay;
    }),
    getLastDateOfMonth: (year, month) => __awaiter(this, void 0, void 0, function* () {
        const lastDate = new Date(year, month, 0);
        return lastDate.getDate();
    })
};
//# sourceMappingURL=dateMethod.js.map