import Layout from './Components/layout/Layout';
import Products from './Components/products/Products';
import './App.css';

const App = () => {
    return (
        <div>
            <Layout>
                <Products />
            </Layout>
        </div>
    );
};

export default App;
