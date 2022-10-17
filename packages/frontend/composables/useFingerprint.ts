import fingerprint from '@fingerprintjs/fingerprintjs'
import uaParse from 'ua-parser-js'

const useFingerprint = async() => {
	const fjs = await fingerprint.load()
	const print = await fjs.get()
	const parser = new uaParse()
	const ua = parser.getResult()

	return `${print.visitorId}::${ua.os.name}(${ua.os.version})::${ua.browser.name}(${ua.browser.version})::${ua.engine.name}`
}
export { useFingerprint }
