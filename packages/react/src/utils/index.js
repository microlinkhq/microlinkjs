import { css } from 'styled-components'
import { fetchFromApi, getApiUrl as createApiUrl } from '@microlink/mql'

const isSSR = typeof window === 'undefined'

export const isFunction = fn => typeof fn === 'function'

export const isObject = obj => typeof obj === 'object'

export const isNil = value => value == null

export const getUrlPath = data => (isObject(data) ? data.url : data)

export const someProp = (data, props) =>
  data[props.find(prop => !isNil(data[prop]))]

export const media = {
  mobile: (...args) => css`
    @media (max-width: 48em) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: 48em) {
      ${css(...args)};
    }
  `
}

export const getApiUrl = ({
  apiKey,
  audio,
  contrast = false,
  data,
  force,
  headers,
  media,
  prerender = 'auto',
  proxy,
  ttl,
  url
}) =>
  createApiUrl(url, {
    apiKey,
    audio: media.includes('audio'),
    data,
    force,
    headers,
    palette: contrast,
    prerender,
    proxy,
    screenshot: media.includes('screenshot'),
    ttl,
    video: media.includes('video')
  })

export { fetchFromApi }

export const isLarge = cardSize => cardSize === 'large'

export const isSmall = cardSize => cardSize === 'small'

export const imageProxy = url => `https://images.weserv.nl/?url=${encodeURI(url)}&l=9&af&il`

export const isLazySupported = !isSSR && 'IntersectionObserver' in window

const BASE_CLASSNAME = 'microlink_card'
const CONTENT_BASE_CLASSNAME = `${BASE_CLASSNAME}__content`
const MEDIA_BASE_CLASSNAME = `${BASE_CLASSNAME}__media`
const CONTROLS_BASE_CLASSNAME = `${MEDIA_BASE_CLASSNAME}__controls`

export const classNames = {
  main: BASE_CLASSNAME,
  content: CONTENT_BASE_CLASSNAME,
  title: `${CONTENT_BASE_CLASSNAME}_title`,
  description: `${CONTENT_BASE_CLASSNAME}_description`,
  url: `${CONTENT_BASE_CLASSNAME}_url`,
  mediaWrapper: `${MEDIA_BASE_CLASSNAME}_wrapper`,
  media: MEDIA_BASE_CLASSNAME,
  image: `${MEDIA_BASE_CLASSNAME}_image`,
  videoWrapper: `${MEDIA_BASE_CLASSNAME}_video_wrapper`,
  video: `${MEDIA_BASE_CLASSNAME}_video`,
  audioWrapper: `${MEDIA_BASE_CLASSNAME}_audio_wrapper`,
  audio: `${MEDIA_BASE_CLASSNAME}_audio`,
  mediaControls: CONTROLS_BASE_CLASSNAME,
  playbackControl: `${CONTROLS_BASE_CLASSNAME}_playback`,
  volumeControl: `${CONTROLS_BASE_CLASSNAME}_volume`,
  rwControl: `${CONTROLS_BASE_CLASSNAME}_rewind`,
  ffwControl: `${CONTROLS_BASE_CLASSNAME}_fast_forward`,
  rateControl: `${CONTROLS_BASE_CLASSNAME}_rate`,
  progressBar: `${CONTROLS_BASE_CLASSNAME}_progress`,
  progressTime: `${CONTROLS_BASE_CLASSNAME}_progress_time`
}
