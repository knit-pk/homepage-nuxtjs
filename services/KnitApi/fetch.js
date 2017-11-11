import SubmissionError from '~/errors/SubmissionError'
import { API_HOST, API_PATH } from '~/config/api'

const jsonLdMimeType = 'application/ld+json'

export default function (url, options = {}) {
  const headers = new Headers()

  console.log(headers)

  if (typeof options.headers === 'undefined') options.headers = new Headers()
  if (options.headers.get('Accept') === null) options.headers.set('Accept', jsonLdMimeType)

  if (options.body !== 'undefined' && !(options.body instanceof FormData) && options.headers.get('Content-Type') === null) {
    options.headers.set('Content-Type', jsonLdMimeType)
  }

  const link = url.includes(API_PATH) ? API_HOST + url : API_HOST + API_PATH + url

  return fetch(link, options).then(response => {
    if (response.ok) return response

    return response
      .json()
      .then(json => {
        const error = json['hydra:description'] ? json['hydra:description'] : response.statusText
        if (!json.violations) throw Error(error)

        let errors = {_error: error}
        // eslint-disable-next-line
        json.violations.map((violation) => errors[violation.propertyPath] = violation.message)

        throw new SubmissionError(errors)
      })
  })
}
