import {
	FcAbout,
	FcAnswers,
	FcApproval,
	FcCommandLine,
	FcConferenceCall,
	FcDocument,
	FcGraduationCap,
	FcNews,
	FcRules,
	FcSms,
	FcSurvey,
	FcTimeline,
} from 'react-icons/fc'

const resources = {
	about: {
		icon: <FcAbout />,
	},
	timeline: {
		icon: <FcTimeline />,
	},
	authors: {
		icon: <FcConferenceCall />,
	},
	publications: {
		articles: {
			icon: <FcNews />,
		},
		abstracts: {
			icon: <FcRules />,
		},
		dissertations: {
			icon: <FcGraduationCap />,
		},
		monographs: {
			icon: <FcDocument />,
		},
		patents: {
			icon: <FcApproval />,
		},
		reports: {
			icon: <FcSurvey />,
		},
		programs: {
			icon: <FcCommandLine />,
		},
		textbooks: {
			icon: <FcAnswers />,
		},
	},
	admin: {
		characters: {
			icon: <FcSms />,
		},
	},
}

export default resources
