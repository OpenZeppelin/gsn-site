export async function relayServerInfo(options, args) {
  const { url } = args

  let response

  try {
    response = await fetch(url.replace(/\/?\s*$/, "/getaddr"));
    let resp = await response.json()

    const {
      MinGasPrice,
      Ready,
      RelayServerAddress,
      Version
    } = resp

    return {
      MinGasPrice,
      Ready,
      RelayServerAddress,
      Version
    }
  } catch (e) {
    // console.error(e)
  }
}
