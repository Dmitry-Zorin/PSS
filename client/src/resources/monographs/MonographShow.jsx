import React from 'react'
import { AuthorsField, DescriptionField, DownloadFileField, ExitDataField, TitleField, TypeField, VolumeField, YearField } from '../../components/fields'
import MyShow from '../MyShow'

function CharacterField() {
	return null
}

const MonographShow = () => (
	<MyShow>
		<TitleField/>
		<DescriptionField/>
		<TypeField/>
		<YearField/>
		<VolumeField/>
		<AuthorsField/>
		<CharacterField/>
		<ExitDataField/>
		<DownloadFileField/>
	</MyShow>
)

export default MonographShow
