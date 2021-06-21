import React from "react"

import { PageSubtitleStyled, PageTitleContainer, PageTitleStyled } from './styles'

export interface PageTitleProps {
    title: string;
    subtitle?: string | JSX.Element
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
    return (
        <PageTitleContainer>
            <PageTitleStyled>
                {title}
            </PageTitleStyled>
            <PageSubtitleStyled>
                {subtitle}
            </PageSubtitleStyled>
        </PageTitleContainer>
    )
}
