export async function relayAddress(options, args) {
  const { url } = args

  let response

  try {
    response = await fetch(url.replace(/\/?\s*$/, "/getaddr"));
    let resp = await response.json()

    const {
      // MinGasPrice,
      // Ready,
      RelayServerAddress,
      // Version
    } = resp

    return RelayServerAddress
  } catch (e) {
    // console.error(e)
  }
}
