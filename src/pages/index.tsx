import { NextPage } from 'next'
import Nav from '../components/nav'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Next.js + Tailwind CSS
        </h1>
      </div>
    </div>
  )
}

export default IndexPage;
