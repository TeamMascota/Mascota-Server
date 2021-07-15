module.exports = {
    loveFeeling: async (name: string) => {
        return `작가님과 함께하면서 ${name}(이)는 많은 사랑을 받았고, 또 주었어요.
        ${name}(이)가 사랑을 느꼈던 순간들이예요. ${name}(이)에게 사랑을 알려주셔서 감사합니다.`
    },
    happyFeeling: async (name: string) => {
        return `맛있는 간식을 먹거나 재미있는 놀이를 할 때, 작가님은 ${name}(이)를 행복하게 해주려고 매순간 노력했어요. 이런 작가님과 함께한 매일매일이 ${name}(이)에겐 기쁜 순간이었습니다. `
    },
    normalFeeling: async () => {
        return `매일 색다른 모험을 하지 않아도 좋아요. 평화롭던 보통의 날들도 아름다운 추억으로 여기 남아 있습니다.`
    },
    angryFeeling: async (name: string) => {
        return `평화롭고 행복한 날들만이 의미있는 것은 아니죠. 때로는 화도 냈고, 투정도 부렸어요. 그 과정에서 ${name}(이)는 다양한 감정을 배우는 어른 고양이로 성장할 수 있었습니다.`
    },
    gloomyFeeling: async () => {
        return `때로는 어두운 그늘에 있던 때도 있었지만, 그 덕분에 강한 햇볕을 피해 감정의 휴식을 취할 수 있었어요.`
    },
    boringFeeling: async () => {
        return `매일 즐겁지는 않았지만, 그 덕에 고민 걱정 없는 심심한 날들을 보낼 수도 있었어요. 평화로운 나날들을 선물해주셔서 감사합니다.`
    }
}