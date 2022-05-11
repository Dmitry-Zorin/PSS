import CodeIcon from '@mui/icons-material/Code'
import DescriptionIcon from '@mui/icons-material/Description'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SubjectIcon from '@mui/icons-material/Subject'
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'

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
