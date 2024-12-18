
import './App.css'
import AuthContextProvider from './context/AuthContext'
import Router from './Router'


function App() {

  return (
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
  )
}

export default App
