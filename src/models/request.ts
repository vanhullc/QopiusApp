import { AnalysedImage } from './analysedImage';

export class Request {
    id: number;
    product: String;
    category: String;
    date: Date;
    type: String;
    image: String;
    cancelOptions: String[];

    constructor(id: number, product: String, category: String, date: Date, type: String, cancelOptions: String[]) {
        this.id = id;
        this.product = product;
        this.category = category;
        this.date = date;
        this.type = type;
        this.image = "https://s-media-cache-ak0.pinimg.com/originals/0e/18/03/0e18034419d03ffaec2b30ff712b7f75.jpg";
        this.cancelOptions = cancelOptions;
    }
}