import { Link, Navigate, useNavigate } from 'react-router-dom'
import './admin-private.css'

const ADMIN_AUTH_KEY = 'classtools:adminAuthed'

export function AdminPrivate() {
  const navigate = useNavigate()

  const authed = localStorage.getItem(ADMIN_AUTH_KEY) === 'true'
  if (!authed) return <Navigate to="/admin-login" replace />

  const openZorr = () => {
    const win = window.open('about:blank', '_blank')
    if (!win) return
    win.opener = null

    try {
      const doc = win.document

      doc.title = 'Classtools'
      doc.documentElement.lang = 'en'

      const style = doc.createElement('style')
      style.textContent = `
        :root { color-scheme: light dark; }
        html, body { height: 100%; margin: 0; }
        .wrap { height: 100%; }
        iframe { width: 100%; height: 100%; border: 0; display: block; background: rgba(127,127,127,.08); }
      `
      doc.head.appendChild(style)

      const wrap = doc.createElement('div')
      wrap.className = 'wrap'

      const iframe = doc.createElement('iframe')
      iframe.src = 'https://zorr.pro'
      iframe.allowFullscreen = true
      iframe.referrerPolicy = 'no-referrer'

      wrap.appendChild(iframe)

      doc.body.innerHTML = ''
      doc.body.appendChild(wrap)
      win.focus()
    } catch {
      win.location.href = 'https://zorr.pro'
    }
  }

  return (
    <main className="ct-private">
      <div className="ct-private__card">
        <p className="ct-private__kicker">Private</p>
        <h1>Admin page</h1>
        <p className="ct-private__lede">You’re logged in as admin.</p>

        <div className="ct-private__actions">
          <button
            type="button"
            className="ct-private__button ct-private__button--secondary"
            onClick={openZorr}
          >
            Open
          </button>
          <button
            type="button"
            className="ct-private__button"
            onClick={() => {
              localStorage.removeItem(ADMIN_AUTH_KEY)
              navigate('/home', { replace: true })
            }}
          >
            Log out
          </button>
          <Link className="ct-private__link" to="/home">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}

