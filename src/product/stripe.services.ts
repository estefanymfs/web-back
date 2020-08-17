import { Injectable, HttpService } from "@nestjs/common";

@Injectable()
export class StripeService {
    constructor(private httpService: HttpService) {}

    async createToken(
        cardNumber: string,
        cvv: string,
        expMonth: string,
        expYear: string,
        email: string
    ): Promise<any> {
        const token = await this.httpService.post(
            'https://secure.culqi.com/v2/tokens',
            {
                "card_number": cardNumber,
                "cvv": cvv,
                "expiration_month": expMonth,
                "expiration_year": expYear,
                "email": email
            },
            { headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer pk_test_OoIotOhmJIz8PVzI'
            }}
        ).toPromise();
        return token.data;
    }

    async createCharge(amount: string, email: string, source: string): Promise<any> {
        console.log('source', source);
        try{
            const charge = await this.httpService.post(
                'https://api.culqi.com/v2/charges',
                {
                    "amount": amount,
                    "currency_code": "PEN",
                    "email": email,
                    "source_id": source
                },
                { headers: {
                    'Content-yype': 'application/json',
                    'Authorization': 'Bearer sk_test_FQVyMkdAltGW0m2S'
                }}
            ).toPromise();
            console.log('charge', charge);
            return charge.data;
        } catch(e){
            console.log('e', e);
        }
        
    }
}