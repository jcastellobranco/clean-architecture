import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { http } from "../../../utils/http";
import { Order } from "../../../utils/models";
type CheckoutSucessPageProps = {
    order: Order
};
export const CheckoutSucessPage: NextPage<CheckoutSucessPageProps> = ({ order }: CheckoutSucessPageProps) => {
    return (
        <div>
            <h3>Parabéns sua compra ID foi efetivada</h3>
            <ul>

                {order.products.map((product) => (
                    <li key={product.id}>
                        Produto {product.name} | {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckoutSucessPage

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params || {}
    const { data: order } = await http.get(`orders/${id}`)
    return {
        props: {
            order,
        },
    };
};