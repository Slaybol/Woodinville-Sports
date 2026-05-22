import { render, screen } from '@testing-library/react'
import { IPhoneFrame } from '@/components/layout/iphone-frame'

describe('IPhoneFrame', () => {
  it('renders children inside the screen-first frame', () => {
    render(
      <IPhoneFrame>
        <div>Inside frame</div>
      </IPhoneFrame>
    )

    expect(screen.getByText('Inside frame')).toBeInTheDocument()
    expect(screen.getByTestId('phone-frame')).toBeInTheDocument()
    expect(screen.getByTestId('phone-frame-sheen')).toBeInTheDocument()
  })

  it('keeps the desktop framing classes that create the app canvas treatment', () => {
    render(
      <IPhoneFrame>
        <div>Inside frame</div>
      </IPhoneFrame>
    )

    expect(screen.getByTestId('phone-frame')).toHaveClass(
      'md:rounded-[34px]',
      'md:shadow-[0_28px_70px_rgba(17,24,39,0.16),0_8px_24px_rgba(17,24,39,0.08)]',
      'md:ring-1'
    )
  })
})
