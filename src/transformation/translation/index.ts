import axios from 'axios'

export const translate = (
  text: string,
  from: string,
  to: string,
  translationConfig: any
) => {
  const { url, secretKey } = translationConfig
  const data = [
    {
      Text: text,
    },
  ]
  const reqConfig = {
    headers: {
      'Ocp-Apim-Subscription-Key': secretKey,
      'Content-Type': 'application/json',
    },
    params: {
      from,
      to,
      'api-version': '3.0',
    },
  }
  return axios.post(url, data, reqConfig)
}
