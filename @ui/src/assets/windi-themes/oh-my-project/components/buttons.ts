const btnBase = {
	display: 'inline-flex',
	flexShrink: '0',
	cursor: 'pointer',
	flexWrap: 'wrap',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	borderRadius: '4px',
	lineHeight: '1.25',
	'&:focus, &:focus-visible, &:focus-within': {
		outline: 'none',
	},
	'&:focus, .focus': {
		boxShadow: '0 0 0 2px var(--primary)',
	},
	'&:disabled, .disabled': {
		opacity: '.7',
		cursor: 'not-allowed',
	},
}

const btnBaseSecondary = {
	...btnBase,
	backgroundColor: 'var(--secondary)',
	color: 'var(--typography-common)',
}

const btnBasePrimary = {
	...btnBase,
	backgroundColor: 'var(--primary)',
	color: 'var(--typography-common--dark)',
}

export const buttons = {
	'.btn': {
		...btnBaseSecondary,
		padding: '8px',
		fontSize: '16px',
	},
	'.btn--tiny': {
		...btnBaseSecondary,
		padding: '4px 6px',
		fontSize: '14px',
	},
	'.btn-primary': {
		...btnBasePrimary,
		padding: '8px',
		fontSize: '16px',
	},
	'.btn-primary--tiny': {
		...btnBasePrimary,
		padding: '4px 6px',
		fontSize: '14px',
	},
}
