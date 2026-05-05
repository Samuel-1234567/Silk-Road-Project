import { useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './home.css'
import './admin-login.css'

export function AdminLogin() {
  const navigate = useNavigate()
  const adminId = useId()
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState<string | null>(null)
  const adminErrorId = useId()
  const isAdminPasswordValid = useMemo(
    () => adminPassword === 'samwise14',
    [adminPassword],
  )

  return (
    <main className="ct-admin-login">
      <div className="ct-home__card">
        <h1>Admin login</h1>
        <p className="ct-admin-login__lede">Enter the admin password to continue.</p>

        <div className="ct-field">
          <label className="ct-field__label" htmlFor={adminId}>
            Password
          </label>
          <input
            id={adminId}
            className="ct-field__input"
            type="password"
            value={adminPassword}
            onChange={(e) => {
              setAdminPassword(e.target.value)
              setAdminError(null)
            }}
            placeholder="Admin password"
            autoComplete="current-password"
            aria-invalid={adminError ? true : undefined}
            aria-describedby={adminError ? adminErrorId : undefined}
          />
          {adminError ? (
            <div className="ct-field__error" id={adminErrorId} role="alert">
              {adminError}
            </div>
          ) : null}
          <div className="ct-field__actions">
            <button
              type="button"
              className="ct-field__button"
              onClick={() => {
                if (!isAdminPasswordValid) {
                  setAdminError('Incorrect admin password.')
                  return
                }
                localStorage.setItem('classtools:adminAuthed', 'true')
                navigate('/admin', { replace: true })
              }}
            >
              Log in
            </button>
          </div>
        </div>

        <p className="ct-admin-login__back">
          <Link className="ct-admin-login__link" to="/home">
            Back to dashboard
          </Link>
        </p>
      </div>
    </main>
  )
}
