// Card.ts
export default class Card2 {
    index: number;
    value: number | null;
    shape: number | null;
    king: number | null;
  
    constructor(value?: number, shape?: number, king?: number) {
      this.index = -1; 
      this.value = value || null;
      this.shape = shape || null;
      this.king = king !== undefined ? king : null;
    }

    
  }