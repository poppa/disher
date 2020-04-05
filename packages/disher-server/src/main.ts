import './dotenv'

async function main(): Promise<void> {
  console.info(`Main`)
}

// Only run if we're the entry point
if (!module.parent) {
  main().catch((e) => console.error(e, 'Run server'))
}
