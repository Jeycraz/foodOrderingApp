import './App.css'
import Header from './Layout/HeaderComponent/Header'
import Background from './Layout/BackgroundComponent/Background'
import Lists from './Layout/ListsComponent/Lists'
import CartProvider from './context/CartProvider'


/* Have to wrap the context in between the components that needed it */
function App() {
  
  return (
    <div className="App">
      <CartProvider>
          <Header/>
          <Background/>
          <Lists/>
      </CartProvider>
    </div>
  )
}

export default App