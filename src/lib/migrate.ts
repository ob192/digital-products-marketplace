import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

let migrated = false

export async function ensureMigrations() {
    if (migrated) return

    try {
        console.log('🔄 Running database migrations...')
        const { stdout, stderr } = await execAsync('npx prisma migrate deploy', {
            cwd: process.cwd(),
            env: { ...process.env },
        })
        if (stdout) console.log(stdout)
        if (stderr) console.error(stderr)
        console.log('✅ Migrations complete')
        migrated = true
    } catch (err) {
        console.error('❌ Migration failed:', err)
        throw err
    }
}