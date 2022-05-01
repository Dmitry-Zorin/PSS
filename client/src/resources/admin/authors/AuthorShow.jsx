import React from 'react'
import { TextField } from 'react-admin'
import MyShow from '../../MyShow'

const ArticleShow = () => (
	<MyShow>
		<TextField source='lastName' label='fields.lastName' emptyText='-'/>
		<TextField source='firstName' label='fields.firstName' emptyText='-'/>
		<TextField source='middleName' label='fields.middleName' emptyText='-'/>
		<TextField source='info' label='fields.info' emptyText='-'/>
	</MyShow>
)

export default ArticleShow
