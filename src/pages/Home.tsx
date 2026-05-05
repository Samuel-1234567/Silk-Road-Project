import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './home.css'

const SITE_TITLE = 'The Tang Dynasty'
const SITE_BYLINE = 'By: Samuel and Jeremy'

const NAV: { id: string; label: string }[] = [
  { id: 'background', label: 'Background' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'heart-of-the-story', label: 'Heart of the story' },
  { id: 'the-impact-today', label: 'The impact today' },
]

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (pathname !== '/home' || !hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [pathname, hash])
  return null
}

function NavHashLink({
  id,
  label,
  isActive,
}: {
  id: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      to={`/home#${id}`}
      className="ct-home__nav-link"
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}

export function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  /** Which section is “current”: last in reading order whose top has crossed this line (px from top of <main> viewport). */
  useLayoutEffect(() => {
    const root = mainRef.current
    if (!root) return

    const ACTIVATION_PX = 96
    const lastId = NAV[NAV.length - 1]!.id

    let raf = 0
    const update = () => {
      raf = 0
      const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
      if (maxScroll > 0 && root.scrollTop >= maxScroll - 3) {
        setActiveSectionId(lastId)
        return
      }

      const rootRect = root.getBoundingClientRect()
      let active: string | null = null
      for (const { id } of NAV) {
        const el = document.getElementById(id)
        if (!el) continue
        const relTop = el.getBoundingClientRect().top - rootRect.top
        if (relTop <= ACTIVATION_PX) active = id
      }
      setActiveSectionId(active)
    }

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    root.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    const ro = new ResizeObserver(schedule)
    ro.observe(root)

    return () => {
      ro.disconnect()
      root.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="ct-home ct-home--dashboard">
      <ScrollToHash />
      <header className="ct-home__header">
        <Link to="/home" className="ct-home__brand">
          <span className="ct-home__brand-title">{SITE_TITLE}</span>
        </Link>
        <nav className="ct-home__nav" aria-label="Main">
          {NAV.map(({ id, label }) => (
            <NavHashLink key={id} id={id} label={label} isActive={activeSectionId === id} />
          ))}
        </nav>
      </header>

      <main ref={mainRef} className="ct-home__main">
        <div className="ct-home__card">
          <h1 className="ct-home__main-heading">
            <span className="ct-home__main-heading-title">{SITE_TITLE}</span>
            <span className="ct-home__main-heading-byline">{SITE_BYLINE}</span>
          </h1>
        </div>

        <article id="background" className="ct-home__card ct-home__section">
          <h2 className="ct-home__section-title">Background</h2>
          <p className="ct-home__section-text">
            {`The Silk Road was an important trading route that connected the world in ancient times. The Silk Road was not made out of silk. The reason they named it the Silk Road was because of the amount of silk from China that was carried and brought along the route.`}
          </p>
          <p className="ct-home__section-text">
            {`Though the Chinese had developed the method to make silk thousands of years ago, they had kept it a secret all along. Not only goods such as spices, precious metals, and art were traded on these routes, religions and cultures were also spread and brought across the lands.`}
          </p>
          <p className="ct-home__section-text">
            {`The Silk Road extended for more than 6,000 kilometers. Before the Silk Road, people never got to reach out to people other than the ones in their own town. Though the Silk Road perished and didn't last, it had opened a new version of the world.`}
          </p>
          <figure className="ct-home__section-figure">
            <img
              className="ct-home__section-image"
              src="/silk-road-map.jpg"
              alt="Map of the Silk Road trade routes across Asia and connecting regions."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </article>

        <article id="thesis" className="ct-home__card ct-home__section">
          <h2 className="ct-home__section-title">Thesis</h2>
          <p className="ct-home__section-text">
            {`In the early 600s CE, China's Sui Dynasty with Yangdi in charge fell and many rival factions started struggling for power. In 618 CE, the Tang Dynasty, with Li Yuan leading it, rose to power. During the Tang Dynasty's rule, from 618 to 907, China experienced its "golden age." During its golden age, Chinese culture spread. China maintained trade relations, and acted as a bulwark against Islamic expansion.`}
          </p>
        </article>

        <article id="heart-of-the-story" className="ct-home__card ct-home__section">
          <h2 className="ct-home__section-title">Heart of the story</h2>
          <p className="ct-home__section-text">
            {`Li Yuan, also known as Gaozu, was formerly a contender for rule of the Sui. After becoming the first Tang emperor, he overcame many rivals and rebels and was in control of China's eastern plains by 621 CE. By 624 CE he controlled most of China. Li Yuan made administration simple and cheap. He gave every taxable man a plot and created mints. He also created laws with specific penalties for different acts.`}
          </p>
          <p className="ct-home__section-text">
            {`The second emperor, Li Shimin, succeeded the throne in 626 after murdering two brothers and forcing his father to give up the throne. Despite this, he went on to become one of China's greatest rulers. He changed the balance of court aristocracy and developed examination in literature as well as culture as a method of hiring servants and created high-quality schools at the capital. Furthermore, he defeated Turkish armies and expanded China to the west.`}
          </p>
        </article>

        <article id="the-impact-today" className="ct-home__card ct-home__section">
          <h2 className="ct-home__section-title">The impact today</h2>
          <p className="ct-home__section-text">
            {`The Tang Dynasty was a "golden age" that profoundly influenced East Asia through its cosmopolitan culture, advanced administration, and artistic achievements. It established a model of centralized government, Buddhism, and Confucianism, which Korea, Japan, and Vietnam adopted. The capital, Chang'an, was a major international trade hub.`}
          </p>
        </article>
      </main>

      <footer className="ct-home__footer">
        <Link to="/admin-login" className="ct-home__footer-link">
          Admin login
        </Link>
      </footer>
    </div>
  )
}
