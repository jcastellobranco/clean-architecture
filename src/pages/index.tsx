import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ListProductsUseCase } from '../@core/application/product/list-products.use-case'
import { ProductHttpGateway } from '../@core/infra/gateways/product-http.gateway'
import { http } from '../utils/http'
import { Product } from '../utils/models'

type HomeProps = {
  products: Product[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1> E-Commerce Test</h1>
      <ul>
        {products.map((product, key) => (
          <li key={key}>
            <label>Nome:</label> {product.name} |
            <Link href={`/products/${product.id}`} passHref>
             <a href="">Ver</a> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gateway = new ProductHttpGateway(http);
  const useCase = new ListProductsUseCase(gateway);
  const products = await useCase.execute();
  return {
    props: {
      products,
    }
  }
}
