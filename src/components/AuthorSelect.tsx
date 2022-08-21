import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	List,
	ListItem,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Stack,
	Text,
} from '@chakra-ui/react'
import {
	faCircleMinus,
	faCirclePlus,
	faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { AnimatePresence, motion } from 'framer-motion'
import { getAuthorFullName } from 'helpers/authors'
import { useQuery } from 'hooks'
import { transform } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { GetAuthorsResponse } from 'server/services/author'
import { stiffSpringConfig } from 'utils/animation'

export default function AuthorSelect() {
	const { t } = useTranslation('resources')
	const [search, setSearch] = useState<string | undefined>()
	const [value, setValue] = useState('')
	const [selectedAuthors, setSelectedAuthors] = useState<
		{ id: number; name: string }[]
	>([])

	const { error, data } = useQuery<GetAuthorsResponse>(
		'authors',
		{
			perPage: 100,
			search: search,
		},
		{ keepPreviousData: true },
	)

	return (
		<FormControl>
			<FormLabel>{t('authors.name_other')}</FormLabel>
			<Stack direction="row-reverse" align="flex-start">
				<Box>
					<Menu closeOnSelect={false}>
						<MenuButton
							as={Button}
							leftIcon={<Icon icon={faCirclePlus} boxSize={5} />}
						>
							{t('common:actions.add')}
						</MenuButton>
						<MenuList>
							<Box px={1} pb={2}>
								<InputGroup>
									<InputLeftElement>
										<Icon icon={faSearch} />
									</InputLeftElement>
									<Input
										value={value}
										placeholder={t('common:actions.search')}
										onChange={(e) => setValue(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault()
												setSearch(value || undefined)
											}
										}}
									/>
								</InputGroup>
							</Box>
							<MenuOptionGroup
								type="checkbox"
								value={selectedAuthors.map(({ id }) => id.toString())}
								onChange={(ids) => {
									return setSelectedAuthors(
										transform(
											data!.records,
											(result: typeof selectedAuthors, value) => {
												if (ids.includes(value.id.toString())) {
													result.push({
														id: value.id,
														name: getAuthorFullName(value),
													})
												}
											},
										),
									)
								}}
							>
								{data &&
									data?.records.map((author) => (
										<MenuItemOption
											key={author.id}
											value={author.id.toString()}
										>
											{getAuthorFullName(author)}
										</MenuItemOption>
									))}
							</MenuOptionGroup>
						</MenuList>
					</Menu>
				</Box>
				<List flexGrow={1}>
					{!selectedAuthors.length && (
						<ListItem h={0} color="text-secondary">
							Чтобы добавить авторов нажмите &rarr;
						</ListItem>
					)}
					<AnimatePresence>
						{selectedAuthors.map(({ id, name }) => (
							<motion.li
								key={id}
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{
									height: stiffSpringConfig,
									opacity: { duration: 0.1 },
								}}
							>
								<HStack>
									<IconButton
										aria-label={t('common:actions.remove')}
										icon={<Icon icon={faCircleMinus} />}
										onClick={() =>
											setSelectedAuthors(
												selectedAuthors.filter((e) => e.id !== id),
											)
										}
									/>
									<Text>{name}</Text>
								</HStack>
							</motion.li>
						))}
					</AnimatePresence>
				</List>
			</Stack>
		</FormControl>
	)
}
