import NextHead from 'next/head'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

interface HeadProps {
	children?: ReactElement[]
	title: string
	desc?: string
}

export default function Head({ children, title, desc }: HeadProps) {
	const { t } = useTranslation('common')

	return (
		<NextHead>
			<title>{`${title} | ${t('name')}`}</title>
			<meta name="description" content={desc} />
			{children}
		</NextHead>
	)
}
