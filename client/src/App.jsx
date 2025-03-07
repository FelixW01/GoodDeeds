import './App.css'
import HomePage from './pages/homepage'
import DashboardPage from './pages/dashboardpage'
import CreateListPage from './pages/homepage'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/collection" element={<CollectionPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
