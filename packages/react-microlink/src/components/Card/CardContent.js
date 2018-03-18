import React from 'react'
import styled, {css} from 'styled-components'
import extractDomain from 'extract-domain'
import CardText from './CardText'

import {media} from '../../utils'

const isLarge = cardSize => cardSize === 'large'

const largeContentStyle = css`
  flex: 0 0 125px;
`

const mobileDescriptionStyle = css`
  ${media.mobile`
    > p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `}
`

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
  padding: 10px 15px;
  min-width: 0;
  box-sizing: border-box;
  ${({cardSize}) => isLarge(cardSize) && largeContentStyle};
`

const Title = styled.header`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  flex-grow: 1.2;
`

const Description = styled.div`
  font-size: 14px;
  flex-grow: 2;
  margin: auto 0;
  line-height: 18px;
  ${({cardSize}) => !isLarge(cardSize) && mobileDescriptionStyle};
`

const Url = styled.footer`
  font-size: 12px;
  margin: 0;
  flex-grow: 0;
`

export default ({title, description, url, cardSize, className}) => (
  <Content className={className} cardSize={cardSize}>
    <Title className='microlink_card__content_title'>
      {title && <CardText lines={1}>{title}</CardText>}
    </Title>
    <Description className='microlink_card__content_description' cardSize={cardSize}>
      {description && <CardText lines={2}>{description}</CardText>}
    </Description>
    <Url className='microlink_card__content_url'>
      {url && <CardText lines={1}>{extractDomain(url)}</CardText>}
    </Url>
  </Content>
)
