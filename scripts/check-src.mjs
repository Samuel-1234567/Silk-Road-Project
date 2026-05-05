import fs from 'node:fs'
import path from 'node:path'

const mainTsx = path.join(process.cwd(), 'src', 'main.tsx')
if (!fs.existsSync(mainTsx)) {
  console.error(`
Build error: src/main.tsx is missing.

Vercel only deploys files that are committed to Git. From your project folder run:

  git add src
  git status
  git commit -m "Add application source"
  git push

Then confirm on github.com that the src/ folder and files are visible in the repository.
`)
  process.exit(1)
}
