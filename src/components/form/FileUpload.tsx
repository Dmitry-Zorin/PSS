import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Text,
} from '@chakra-ui/react'
import {
	faCircleMinus,
	faFileLines,
	faFileUpload,
} from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'

interface FileUploadProps {
	onChange: any
}

export default function FileUpload() {
	const {
		control,
		formState: { errors },
	} = useFormContext()
	return (
		<FormControl isInvalid={!!errors.file}>
			<FormLabel>File</FormLabel>
			<Controller
				name="file"
				control={control}
				render={({ field: { onChange } }) => (
					<FileUpload2 onChange={onChange} />
				)}
			/>
			<FormErrorMessage>
				{errors.file?.message as string | undefined}
			</FormErrorMessage>
		</FormControl>
	)
}

function FileUpload2({ onChange }: FileUploadProps) {
	const [filename, setFilename] = useState<string>()

	const onDrop = (acceptedFiles: File[]) => {
		const file = acceptedFiles[0]
		setFilename(file.name)
		onChange(file)
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
	})

	return (
		<Box
			px={6}
			py={4}
			borderRadius="lg"
			border="1px"
			borderStyle="dashed"
			borderColor="border"
			cursor="pointer"
			_hover={{ borderColor: 'text-secondary' }}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<HStack spacing={4} minH={10}>
				<Icon
					icon={filename ? faFileLines : faFileUpload}
					boxSize={6}
					color="text-secondary"
				/>
				{isDragActive ? (
					<Text>Drop the files here ...</Text>
				) : filename ? (
					<>
						<Text flexGrow={1} minW={0}>
							{filename}
						</Text>
						<IconButton
							aria-label="close"
							icon={<Icon icon={faCircleMinus} />}
							onClick={(e) => {
								e.stopPropagation()
								setFilename(undefined)
								onChange(undefined)
							}}
						/>
					</>
				) : (
					<Text>Drag and drop some files here, or click to select files</Text>
				)}
			</HStack>
		</Box>
	)
}
