
import './App.css'
import AuthContextProvider from './context/AuthContext'
import UsersContextProvider from "./context/UsersContext"
import Router from './Router'


function App() {

  return (
      <AuthContextProvider>
        <UsersContextProvider>
          <Router />
        </UsersContextProvider>
      </AuthContextProvider>
  )
}

export default App
