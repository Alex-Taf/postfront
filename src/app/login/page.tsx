"use client"

import { Input, InputLabel, FormGroup, TextField, FormControl, IconButton, InputAdornment, Button, Link } from "@mui/material"
import styles from "./styles/page.module.scss"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { IUserBody, signIn } from "@/app/store/user"

const Login: React.FC = () => {
  const router = useRouter()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (body: IUserBody) => {
    const authorize = await signIn(body)

    if (authorize && authorize === 'Authorized') {
      router.push('/posts')
    } else {
      console.log(authorize)
    }
  }

  return (
    <section className={styles["login"]}>
      <div className={styles["login-form"]}>
        <FormGroup>
            <TextField
              id="field-login"
              label="Login"
              variant="standard"
              value={login}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLogin(event.target.value);
              }}
            />
            <FormControl margin="normal" variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className={styles["login-form-actions"]}>
              <Button variant="contained" sx={{ width: '30%', height: '40px' }} onClick={() => handleLogin({ login, password })}>
                Sign In
              </Button>
              <Button variant="outlined" sx={{ width: '70%', height: '40px' }} onClick={() => router.push('/registration')}>
                Registration
              </Button>
            </div>
        </FormGroup>
      </div>
    </section>
  )
}

export default Login
