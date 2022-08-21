import useTranslation from 'next-translate/useTranslation'
import NextHead from 'next/head'
import { ReactElement } from 'react'

interface HeadProps {
	children?: ReactElement[]
	title: string
}

export default function Head({ children, title }: HeadProps) {
	const { t } = useTranslation()

	return (
		<NextHead>
			<title>{`${title} | ${t('name')}`}</title>
			{children}
		</NextHead>
	)
}
