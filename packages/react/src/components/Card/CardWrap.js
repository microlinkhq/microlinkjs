import { createElement, forwardRef } from 'react'
import styled, { css } from 'styled-components'

import { media, isLarge } from '../../utils'
import { transition } from '../../theme'

const HEIGHT = '382px'

const contrastStyle = ({ backgroundColor, color }) => css`
  background-color: ${backgroundColor};
  border-color: ${color};
  transition: filter ${transition.medium};

  &&& {
    color: ${color};
  }

  &:hover {
    filter: brightness(90%);
  }
`

const largeStyle = css`
  flex-direction: column;
  height: ${HEIGHT};
  transition: background ${transition.medium}, border-color ${transition.medium}, height ${transition.medium};

  ${media.mobile`
    height: calc(${HEIGHT} * 7/9);
  `};
`

const hoverStyle = css`
  transition-property: background, border-color;
  &:hover {
    background: #f5f8fa;
    border-color: rgba(136, 153, 166, 0.5);
  }
`

const rtlStyle = ({ cardSize }) => css`
  flex-direction: ${isLarge(cardSize) ? 'column-reverse' : 'row-reverse'};
`

const baseStyle = css`
  max-width: 500px;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #e1e8ed;
  overflow: hidden;
  color: #181919;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: flex;
  text-decoration: none;
  opacity: 1;
  position: relative;

  &:active,
  &:hover {
    outline: 0;
  }
`

const createEl = el =>
  styled(el)(
    baseStyle,
    ({ isLoading, contrast }) => !isLoading && !contrast && hoverStyle,
    ({ cardSize }) => isLarge(cardSize) && largeStyle,
    ({ direction }) => direction === 'rtl' && rtlStyle,
    ({ backgroundColor, color, contrast }) =>
      contrast && color && backgroundColor && contrastStyle,
    ({ backgroundColor, color, contrast }) =>
      contrast && (!color || !backgroundColor) && hoverStyle
  )

const CardWrap = forwardRef(({ href, rel, target, ...restProps }, ref) => {
  const props = { ...restProps, ref }

  return createElement(
    createEl(props.as),
    props.as === 'a' ? { href, rel, target, ...props } : props
  )
})

CardWrap.defaultProps = {
  as: 'a',
  rel: 'noopener noreferrer',
  target: '_blank'
}

export default CardWrap
