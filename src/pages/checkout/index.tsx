import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { FormEvent, useContext } from 'react';
import { CartContext } from '../../context/cart.provider';
import { http } from '../../utils/http';
type Props = {

};
export const CheckoutPage: NextPage = (props: Props) => {

    const cartContext = useContext(CartContext)
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const credit_card_number = event.currentTarget.credit_card_number.value;
        const {data:order} = await http.post("orders",{
            products: cartContext.products,
            credit_card_number,
        })
        router.push(`/checkout/${order.id}/success`)
    }

    return (
        <div>
            <h3>Meu carrinho</h3>
            <ul>
                {cartContext.products.map((product) => (
                    <li key={product.id}>
                        Produto {product.name} - {product.price}
                    </li>
                ))}
            </ul>

            <form onSubmit={onSubmit} action="">
                <div>
                    <label htmlFor="">Cartão de crédito</label>
                    <input
                        type="text"
                        name="credit_card_number"
                        id="credit_card_number"
                    />
                </div>
                <div><button type="submit">Comprar</button></div>
            </form>

        </div>
    );
};

export default CheckoutPage;