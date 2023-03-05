import { useState } from 'react'
import { Link } from 'react-router-dom'
//import './index.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signinUser = () => {
    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      const body = {
        email,
        password,
      }

      // url to make login api call
      const url = `${URL}/users/login`

      // make api call using axios
      axios.post(url, body).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)
        if (result['status'] == 'success') {
          toast.success('Welcome  '+ result['data'].firstName )

          // get the data sent by server
          const { userId, firstName, role } = result['data']

          // persist the logged in user's information for future use
          sessionStorage['userId'] = userId
          sessionStorage['firstName'] = firstName
          
          sessionStorage['role'] = role
          // sessionStorage['loginStatus'] = 1

          
          if(role=='customer')
          {
          navigate("/")
          }
          if(role=='admin')
          {
            navigate("/adminmenuupdatedelete")
          }
          if(role=='Manager')
          {
            navigate("/Manager")
            
          }
          if(role=='delivery_person')
          {
            navigate("/deliveryperson")
          }
          

          // navigate('/Session')
        } else {
          toast.error('Invalid user name or password')
        }
      })
    }
  }

  return (
    <div>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-xl-4"></div>
        <div className="col-xl-4">
          <div className="form border border-primary p-4">

            <h1 className='text-center m-3'> Login</h1>
            <div className="mb-3">
           
              <input
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type="text"
                className="form-control m-2"
                placeholder='Email address'
              />
            </div>

            <div className="mb-3">
            
              <input
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type="password"
                className="form-control m-2"
                placeholder='Password'
              />
            </div>
            <div className='text-center m-2'>Dont have account <a href='/Register' >signUp</a></div>

            <div>
              <button onClick={signinUser} className="btn btn-primary form-control">
                Signin
              </button>
              
            </div>
            
          </div>
        </div>
        <div className="col-xl-4"></div>
      </div>
    </div>
  )
}

export default Login

