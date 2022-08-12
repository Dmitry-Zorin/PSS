import useTranslation from 'next-translate/useTranslation'
import NextHead from 'next/head'
import { ReactElement } from 'react'

interface HeadProps {
	children?: ReactElement[]
	title: string
	desc?: string
}

export default function Head({ children, title, desc }: HeadProps) {
	const { t } = useTranslation()

	return (
		<NextHead>
			<title>{`${title} | ${t('name')}`}</title>
			<meta name="description" content={desc} />
			{children}
		</NextHead>
	)
}
