import { useRef } from 'react'

const safeDocument = document ?? {}

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export default () => {
  const scrollBlocked = useRef<boolean>(false)
  const html = safeDocument.documentElement
  const { body } = safeDocument

  const header = document.getElementById('pageHeader')
  const headerBrandIcon = document.getElementById('brandIcon')

  const isBodyUndefined = [body, body.style].some((value) => value === undefined)

  const blockScroll = () => {
    if (isBodyUndefined || header === null || headerBrandIcon === null || scrollBlocked.current) return

    const scrollBarWidth = window.innerWidth - html.clientWidth
    const bodyPaddingRight =
      parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) ?? 0

    const headerPaddingRight =
      parseInt(window.getComputedStyle(header).getPropertyValue('padding-right')) ?? 0
    const headerBrandIconLeft =
      parseFloat(window.getComputedStyle(headerBrandIcon).getPropertyValue('left')) ?? 0

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    headerBrandIcon.style.left = `${headerBrandIconLeft}px`
    html.style.position = 'relative' /* [1] */
    html.style.overflow = 'hidden' /* [2] */
    body.style.position = 'relative' /* [1] */
    body.style.overflow = 'hidden' /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`
    header.style.paddingRight = `${headerPaddingRight + scrollBarWidth}px`

    scrollBlocked.current = true
  }

  const allowScroll = () => {
    if (isBodyUndefined || header === null || headerBrandIcon === null || !scrollBlocked.current) return

    html.style.position = ''
    html.style.overflow = ''
    body.style.position = ''
    body.style.overflow = ''
    body.style.paddingRight = ''
    header.style.paddingRight = ''
    headerBrandIcon.style.left = ''

    scrollBlocked.current = false
  }

  return [blockScroll, allowScroll]
}
