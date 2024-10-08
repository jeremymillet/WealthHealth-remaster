
import './App.css'
import LoginContextProvider from './context/LoginContext'
import TokenContextProvider from './context/TokenContext'
import UsersContextProvider from "./context/UsersContext"
import Router from './Router'


function App() {

  return (
    <LoginContextProvider>
      <TokenContextProvider>
        <UsersContextProvider>
          <Router />
        </UsersContextProvider>
      </TokenContextProvider>
    </LoginContextProvider>
    
  )
}

export default App
