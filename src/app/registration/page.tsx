"use client"

import { Input, InputLabel, FormGroup, TextField, FormControl, IconButton, InputAdornment, Button } from "@mui/material"
import styles from "./styles/page.module.scss"
import { useState } from "react"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { signUp } from "../store/user"
import { useRouter } from "next/navigation"

const Login: React.FC = () => {
  const router = useRouter()

  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordWrong, setPasswordWrong] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword)
  }

  const handleComparePasswords = (repeat: string) => {
    if (repeat !== password) {
      setPasswordWrong(true)
    } else {
      setPasswordWrong(false)
    }
  }

  const handleSignUp = async () => {
    const newUser = await signUp({ login, password })

    if (newUser) {
      router.push('/login')
    }
  }

  const handleKeySignUp = async (e) => {
    if (e.keyCode === '13') {
      await handleSignUp()
    }
  }

  return (
    <section className={styles["registration"]}>
      <div className={styles["registration-form"]}>
        <FormGroup>
            <TextField id="field-login" label="Login" variant="standard" onChange={(e) => setLogin(e.target.value)} />
            <FormControl margin="normal" variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
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
            <FormControl margin="normal" variant="standard">
              <InputLabel htmlFor="standard-adornment-password-repeat">Repeat Password</InputLabel>
              <Input
                id="standard-adornment-password-repeat"
                type={showPassword ? 'text' : 'password'}
                error={passwordWrong}
                onChange={(e) => handleComparePasswords(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className={styles["registration-form-actions"]}>
              <Button variant="contained" sx={{ width: '100%', height: '40px' }} onClick={handleSignUp} onKeyDown={handleKeySignUp}>Done!</Button>
            </div>
        </FormGroup>
      </div>
    </section>
  )
}

export default Login
