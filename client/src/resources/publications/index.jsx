import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import DescriptionIcon from '@mui/icons-material/Description'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SubjectIcon from '@mui/icons-material/Subject'
import CodeIcon from '@mui/icons-material/Code'
import MenuBookIcon from '@mui/icons-material/MenuBook'

const publications = {
	articles: {
		icon: VerticalSplitIcon,
	},
	abstracts: {
		icon: InsertDriveFileIcon,
	},
	dissertations: {
		icon: LibraryBooksIcon,
	},
	monographs: {
		icon: DescriptionIcon,
	},
	patents: {
		icon: PlaylistAddCheckIcon,
	},
	reports: {
		icon: SubjectIcon,
	},
	programs: {
		icon: CodeIcon,
	},
	textbooks: {
		icon: MenuBookIcon,
	},
}

export default publications
