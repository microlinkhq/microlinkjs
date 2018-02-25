import { createElement } from 'react'
import styled, { css } from 'styled-components'

import { media, isLarge } from '../../utils'

const HEIGHT = '382px'

const contrastStyle = ({backgroundColor, color}) => css`
  background-color: ${backgroundColor};
  color: ${color};
  border-color: ${color};
  transition: filter .15s ease-in-out;

  &&& {
    .microlink_card__text {
      color: ${color};
    }
  }

  &:hover {
    filter: brightness(90%);
  }
`

const largeStyle = css`
  flex-direction: column;
  height: ${HEIGHT};

  ${media.mobile`
    height: calc(${HEIGHT} * 7/9);
  `}
`

const loadingStyle = css`
  transition: background-color .15s ease-in-out, border-color .15s ease-in-out;
  &:hover {
    background: #F5F8FA;
    border-color: rgba(136,153,166,.5);
  }
`

const reverseStyle = ({cardSize}) => css`
  flex-direction: ${isLarge(cardSize) ? 'column-reverse' : 'row-reverse'}
`

const roundStyle = ({round}) => css`
  border-radius: ${typeof round === 'boolean' ? `.42857em` : round};
`

const style = css`
  max-width: 500px;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #E1E8ED;
  overflow: hidden;
  display: flex;
  text-decoration: none;
  opacity:1;

  &:active,
  &:hover {
    outline: 0;
  }

  ${({loading, contrast}) => !loading && !contrast && loadingStyle}

  ${({round}) => round && roundStyle}

  ${({cardSize}) => isLarge(cardSize) && largeStyle}

  ${({reverse}) => reverse && reverseStyle}

  ${({backgroundColor, color, contrast}) => contrast && color && backgroundColor && contrastStyle}
`

const CardWrap = ({ is, rel, href, target, ...props }) => {
  const el = styled[is]`${style}`
  const opts = is === 'a' ? { ...props, href, rel, target } : props
  return createElement(el, opts)
}

CardWrap.defaultProps = {
  is: 'a',
  rel: 'noopener noreferrer',
  target: '_blank'
}

export default CardWrap
