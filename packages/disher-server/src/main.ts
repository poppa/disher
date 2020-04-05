async function main(): Promise<void> {
  console.log(`Yay`)
}

// Only run if we're the entry point
if (!module.parent) {
  main().catch((e) => console.error(e, 'Run server'))
}
