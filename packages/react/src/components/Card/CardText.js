import React from 'react'
import styled from 'styled-components'
import NanoClamp from 'nanoclamp'

import { isNil } from '../../utils'

const Clamp = ({ children, className, lines }) =>
  isNil(children) ? null : (
    <NanoClamp className={className} lines={lines} text={children} is='p' />
  )

const CardText = styled(Clamp)`
  &&& {
    text-align: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;
    margin: 0;
  }
`

export default CardText
