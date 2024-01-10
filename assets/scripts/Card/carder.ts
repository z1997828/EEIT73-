
import Card from "./Card2";

const cardValue: { [key: string]: number } = {
    "A": 12,
    "2": 13,
    "3": 1,
    "4": 2,
    "5": 3,
    "6": 4,
    "7": 5,
    "8": 6,
    "9": 7,
    "10": 8,
    "J": 9,
    "Q": 10,
    "K": 11,
};

const cardShape: { [key: string]: number } = {
    "S": 1,
    "H": 2,
    "C": 3,
    "D": 4,
};

const kings: { [key: string]: number } = {
    "kx": 14, //小王
    "Kd": 15,  //大王
};

export default class Deck {
    private cardList: Card[] = [];

    constructor() {
        this.createDeck();
        this.shuffleDeck();
    }

    private createDeck(): void {
        for (const valueKey in cardValue) {
            for (const shapeKey in cardShape) {
                const card = new Card(cardValue[valueKey], cardShape[shapeKey]);
                card.index = this.cardList.length;
                this.cardList.push(card);
            }
        }

        for (const kingKey in kings) {
            const card = new Card(undefined, undefined, kings[kingKey]);
            card.index = this.cardList.length;
            this.cardList.push(card);
        }
    }

    private shuffleDeck(): void {
        for (let i = this.cardList.length - 1; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.cardList[randomIndex], this.cardList[i]] = [this.cardList[i], this.cardList[randomIndex]];
        }
    }

    public splitThreeCards(): Card[][] {
        const threeCards: Card[][] = [[], [], []];
        const bottomCards: Card[] = [];

        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 3; j++) {
                threeCards[j].push(this.cardList.pop() as Card);
            }
        }

        // 抽取底牌
        bottomCards.push(this.cardList.pop() as Card, this.cardList.pop() as Card, this.cardList.pop() as Card);
        console.log([...threeCards, bottomCards]);
        return [...threeCards, bottomCards];
    }
}
