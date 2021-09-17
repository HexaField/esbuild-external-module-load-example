
export default async function() {
  console.log('my module successfully loaded!')

  // not yet working
  // const { default: anotherModule } = await import('./anotherModule')
  // anotherModule()
}